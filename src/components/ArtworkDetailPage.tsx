import React, { useState, useEffect, useContext } from "react";
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "@/context/CartContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebaseconfig";
import RelatedProducts from "./RelatedProduct";

interface SizeOption {
  name: string;
  width: number;
  height: number;
  length: number;
  unit: string;
  priceAdjustment: number;
}

type DescriptionField = { field: string; value: string };

type MediaType = "image" | "video";

interface DisplayImage {
  url: string;
  type: MediaType;
  /** which variant this image came from (if any) */
  variantId?: string;
}

interface Variant {
  id: string;
  colorName: string;
  colorHex: string; // HEX like #FF0000
  sku?: string;
  priceAdjustment?: number;
  quantity?: number | null; // for READY_MADE; else null
  images?: { url: string; type: MediaType }[];
  isDefault?: boolean;
}

const ArtworkDetailPage = () => {
  const { addToCart, toggleCart } = useContext(CartContext);
  const { productName } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state;

  const [artwork, setArtwork] = useState<any | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState<SizeOption | null>(null);
  const [artist, setArtist] = useState<any>({});
  const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null); // no default selection
  const [categoryData, setCategoryData] = useState<any>(null);

  // --- Helpers ---
  // Combine all base images and first image of each variant, then deduplicate by URL
  const uniqueBaseAndVariantImages = (baseImages: DisplayImage[], variants: Variant[]) => {
    const baseImgs = baseImages;
    const firstVariantImgs: DisplayImage[] = [];
    variants.forEach((v) => {
      if (Array.isArray(v.images) && v.images.length > 0) {
        const img = v.images[0];
        firstVariantImgs.push({ ...img, variantId: v.id });
      }
    });
    console.log('Base images data:', baseImgs);
    console.log('Total base images:', baseImgs.length);
    console.log('First variant images data:', firstVariantImgs);
    console.log('Total variant images:', firstVariantImgs.length);
    // Deduplicate by URL
    const allImgs = [...baseImgs, ...firstVariantImgs];
    const seen = new Set<string>();
    const uniqueImgs = allImgs.filter(img => {
      if (!img.url || seen.has(img.url)) return false;
      seen.add(img.url);
      return true;
    });
    console.log('Unique images data:', uniqueImgs);
    console.log('Total unique images:', uniqueImgs.length);
    return uniqueImgs;
  };

  // useEffect(() => {
  //   if (artwork && Array.isArray(artwork.images)) {
  //     console.log('artwork.images:', artwork.images);
  //     (artwork.images as DisplayImage[]).forEach((img, index) => {
  //       console.log(`Thumbnail img.url [${index}]:`, img.url);
  //     });
  //   }
  // }, [artwork]);

  useEffect(() => {
    const fetchArtwork = async () => {
      setIsLoading(true);

      // base object from route state
      let base = state || {};

      // If state is missing but we have a productName, we could theoretically fetch by name
      // but the user specifically said "take the product id from state for data-fetching"
      // So if state is missing, we might need a fallback or just handle partial data.
      
      const productImages: DisplayImage[] = Array.isArray(base.images)
        ? base.images.map((i: any) => ({ url: i.url, type: i.type }))
        : [];

      // merge variant images (if any) INTO artwork.images
      const variantImages: DisplayImage[] = Array.isArray(base.variants)
        ? base.variants.flatMap((v: Variant) =>
            (v.images || []).map((img) => ({
              url: img.url,
              type: img.type,
              variantId: v.id,
            }))
          )
        : [];

      const mergedImages = uniqueBaseAndVariantImages(productImages, Array.isArray(base.variants) ? base.variants : []);

      // initialize selected size
      const firstSize: SizeOption | null =
        Array.isArray(base?.dimensions) && base.dimensions.length > 0
          ? base.dimensions[0]
          : null;

      // construct the final artwork for UI (with merged images)
      const finalArtwork = {
        ...base,
        images: mergedImages,
      };

      setArtwork(finalArtwork);
      setSelectedSize(firstSize);
      setSelectedVariant(null); // no preselect
      setActiveImage(mergedImages?.[0]?.url || "");

      setIsLoading(false);

      // Fetch additional data using the ID from state
      const actualId = base.id;
      if (actualId) {
        if (base?.categoryId) {
          try {
            const categoryRef = doc(db, "productCategories", base.categoryId);
            const categorySnap = await getDoc(categoryRef);
            if (categorySnap.exists()) {
              setCategoryData({
                id: categorySnap.id,
                ...categorySnap.data(),
              });
            } else {
              setCategoryData(null);
            }
          } catch (err) {
            console.error("Error fetching category data:", err);
          }
        }

        // load artist info (optional)
        if (base?.artistId) {
          const artistRef = doc(db, "artists", base.artistId);
          const artistSnap = await getDoc(artistRef);
          if (artistSnap.exists()) {
            setArtist({
              id: artistSnap.id,
              name: artistSnap.data().name || "Unknown Artist",
              description: artistSnap.data().bio || "No description available.",
            });
          } else {
            setArtist(null);
          }
        }
      }
    };

    fetchArtwork();
  }, [productName, state]);

  // When user picks a different color variant, switch hero to that variant's first image
  useEffect(() => {
    if (!artwork?.images?.length) return;

    if (selectedVariant?.id) {
      const firstVariantImg = (artwork.images as DisplayImage[]).find(
        (img) => img.variantId === selectedVariant.id
      );
      if (firstVariantImg && firstVariantImg.url !== activeImage) {
        setActiveImage(firstVariantImg.url);
      }
    } else {
      // If variant is cleared, fall back to the product's first image
      const first = (artwork.images as DisplayImage[])?.[0]?.url;
      if (first && first !== activeImage) {
        setActiveImage(first);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant?.id, artwork?.images]);

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  function getYearFromCreatedAt(createdAt: any) {
    if (!createdAt || typeof createdAt.seconds !== "number") {
      throw new Error("Invalid createdAt object");
    }
    const { seconds, nanoseconds } = createdAt;
    const date = new Date(seconds * 1000 + (nanoseconds || 0) / 1e6);
    return date.getFullYear();
  }

  const isReadyMade = artwork?.orderType === "ready_made";
  const variantQty = isReadyMade ? selectedVariant?.quantity ?? null : null;
  const isOutOfStock =
    // If category is Painting or Sketch → out of stock depends ONLY on quantity
    artwork?.categoryName === "Painting" || artwork?.categoryName === "Sketch"
      ? isReadyMade
        ? selectedVariant
          ? variantQty === 0
          : artwork?.quantity === 0
        : artwork?.quantity === 0
      : // For all other categories → use the isOutOfStock key stored in DB
        artwork?.isOutOfStock ?? false;

  const handleAddToCart = () => {
    if (!artwork) return;

    // If dimensions exist, a size MUST be selected
    if (Array.isArray(artwork.dimensions) && artwork.dimensions.length > 0 && !selectedSize) {
      return;
    }

    const price =
      Number(artwork?.price || 0) +
      Number(selectedSize?.priceAdjustment || 0) +
      Number(selectedVariant?.priceAdjustment || 0);

    const cartItem: any = {
      id: `${artwork?.id}-${selectedVariant?.id || "base"}-${Date.now()}`,
      artworkId: artwork?.id,
      title: artwork?.name,
      price,
      quantity,
      artistName: artwork?.artistName,
      size: selectedSize ? {
        value: `${selectedSize.length}x${selectedSize.width}`,
        label: selectedSize.name,
        priceAdjustment: selectedSize.priceAdjustment || 0,
      } : null,
      variant: selectedVariant
        ? {
            id: selectedVariant.id,
            colorName: selectedVariant.colorName,
            colorHex: selectedVariant.colorHex,
            priceAdjustment: selectedVariant.priceAdjustment || 0,
            sku: selectedVariant.sku || null,
          }
        : null,
      uploadedImageUrl: activeImage || artwork.images?.[0]?.url,
      timestamp: Date.now(),
      deliveryNote: "",
      productCategory: artwork?.categoryName,
      categoryId: artwork?.categoryId,
    };

    addToCart(cartItem);
    toggleCart?.();
  };

  const getVariantTotalPrice = (variant: Variant) => {
    const base = Number(artwork.price) || 0;
    const colorAdj = Number(variant.priceAdjustment) || 0;

    const total = base + colorAdj;
    console.log("Variant total price:", total);
    return `₹${total.toLocaleString()}`;
  };

  const calculatePrice = () => {
    if (!artwork) return "₹0";
    const base = Number(artwork.price) || 0;
    const sizeAdj = Number(selectedSize?.priceAdjustment || 0);
    const colorAdj = Number(selectedVariant?.priceAdjustment || 0);
    const total = base + sizeAdj + colorAdj;
    return `₹${total.toLocaleString()}`;
  };

  const isNotSketch =
    artwork?.categoryName?.toLowerCase().includes("sketch") ||
    artwork?.categoryName?.toLowerCase().includes("painting")
      ? false
      : true;
  const isEmptyArtist = state?.artistName.toLowerCase().includes("none")
    ? true
    : false;

  const isCandle = artwork?.categoryName?.toLowerCase().includes("candle")
    ? true
    : false;

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-pulse">Loading artwork details...</div>
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p>Artwork not found</p>
      </div>
    );
  }

  function convertToWeight(value: number) {
    if (value >= 1) {
      return value.toFixed(2) + " kg";
    } else {
      const grams = value * 1000;
      return Math.round(grams) + " g";
    }
  }

  const hasDynamicDetails =
    Array.isArray(artwork?.descriptionFields) &&
    (artwork?.descriptionFields as DescriptionField[]).length > 0;

  return (
    <div className="container mx-auto px-4 py-6  md:py-12">
      {/* Back button */}
      <Link
        to="/"
        className="inline-flex items-center mb-6 text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft size={18} className="mr-2" />
        <span>Back to Gallery</span>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Images */}
        <div>
          {/* Main Image */}
          <div className="relative overflow-hidden aspect-square mb-4 rounded-lg">
            {activeImage ? (
              <img
                src={activeImage}
                alt={artwork?.name || "Artwork"}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-100" />
            )}

            {/* Category Tag */}
            <div className="absolute top-3 left-3 bg-pastel-yellow px-2 py-0.5 rounded text-xs">
              {artwork.categoryName}
            </div>
          </div>

          {/* Thumbnail Images */}
          {Array.isArray(artwork.images) && artwork.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {(artwork.images as DisplayImage[]).map((img, index) => (
                <div
                  key={`${img.url}-${index}`}
                  className={`aspect-square cursor-pointer rounded overflow-hidden ${
                    activeImage === img.url ? "ring-2 ring-gray-900" : ""
                  }`}
                  onClick={() => setActiveImage(img.url)}
                >
                  {img.type === "video" ? (
                    <video
                      src={img.url}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={img.url}
                      alt={`Detail view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column - Details */}
        <div className="flex flex-col h-full">
          {/* Artist and Title */}
          <div className="mb-2">
            {!isNotSketch && !isEmptyArtist && (
              <p
                onClick={() =>
                  navigate(`/artists/${state.artistId}`, {
                    state: { collection: "products" },
                  })
                }
                className="text-gray-600 hover:underline hover:text-red-400 cursor-pointer"
              >
                {state.artistName}
              </p>
            )}
            <h1 className="font-playfair text-2xl md:text-3xl font-medium text-gray-900 mb-2">
              {state?.name}
            </h1>
            <div className="flex items-center gap-2">
              <p className="text-xl font-medium text-gray-900">
                {calculatePrice()}
              </p>
              {state?.slashedPrice && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{state?.slashedPrice}
                </p>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col md:flex-row gap-3 my-6">
            {/* (Optional) Quantity Selector
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              <span className="px-3 py-2 border-x border-gray-300">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-3 py-2 text-gray-500 hover:text-gray-700"
              >
                <Plus size={16} />
              </button>
            </div> */}

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`flex-1 py-2 px-4 rounded-md flex items-center justify-center gap-2 font-medium text-white ${
                isOutOfStock ? "bg-gray-500" : "bg-primary hover:bg-primary/90"
              }`}
            >
              <ShoppingCart size={18} />
              <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
            </button>
          </div>

          {/* Size Selector */}
          {Array.isArray(artwork.dimensions) && artwork.dimensions.length > 0 && (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {(artwork.dimensions || []).map((size: SizeOption) => (
                    <button
                      key={size.name}
                      onClick={() => setSelectedSize(size)}
                      className={`p-3 border rounded-lg text-left transition-all ${
                        selectedSize?.name === size.name
                          ? "border-gray-900 bg-gray-50 ring-1 ring-gray-900"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      <div className="font-medium">{size.name}</div>
                      <div className="text-sm text-gray-500">
                        {size.length} inch × {size.width} inch
                      </div>
                      <div className="text-sm font-medium text-gray-900 mt-1">
                        {size.priceAdjustment > 0
                          ? `+₹${size.priceAdjustment}`
                          : "Base Price"}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Color Selector (no default selected) */}
          {Array.isArray(artwork?.variants) && artwork.variants.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex flex-wrap gap-3">
                {artwork.variants.map((v: Variant) => {
                  const selected = selectedVariant?.id === v.id;
                  console.log("Rendering variant:", v, "Selected:", selected);
                  const previewImg =
                    v.images && v.images.length > 0 ? v.images[0] : null;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() =>
                        setSelectedVariant(
                          selectedVariant?.id === v.id ? null : v
                        )
                      }
                      className={`flex flex-col items-center gap-2 px-3 py-2 rounded-lg border transition
                      ${
                        selected
                          ? "border-gray-900 ring-1 ring-gray-900 bg-gray-50"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                      aria-label={`Select color ${v.colorName}`}
                      title={v.colorName}
                    >
                      {previewImg && (
                        <div className="">
                          <img
                            src={previewImg.url}
                            alt=""
                            className="w-[50px] h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex gap-2 items-center">
                        <span
                          className="inline-block h-5 w-5 rounded-full border"
                          style={{ backgroundColor: v.colorHex }}
                        />
                        <span className="text-sm">{v.colorName}</span>
                      </div>
                      {typeof v.priceAdjustment === "number" &&
                        v.priceAdjustment > 0 && (
                          <span className="ml-1 text-xs text-gray-600">
                            {getVariantTotalPrice(v)}
                          </span>
                        )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="mb-8">
            <h2 className="font-medium text-lg mb-2">Description</h2>
            <p className="text-gray-600">{state?.description || ""}</p>
          </div>

          {/* Details */}
          {hasDynamicDetails ? (
            <div className="py-4 border-t border-gray-200">
              <h2 className="font-medium text-lg mb-3">Details</h2>
              <div className="grid grid-cols-2 gap-y-2">
                {(artwork.descriptionFields as DescriptionField[]).map(
                  (row, i) => (
                    <React.Fragment key={`${row.field}-${i}`}>
                      <div className="text-gray-600">{row.field}</div>
                      <div>{row.value}</div>
                    </React.Fragment>
                  )
                )}
              </div>
            </div>
          ) : (
            <div className="py-4 border-t border-gray-200">
              <h2 className="font-medium text-lg mb-3">Details</h2>
              <div className="grid grid-cols-2 gap-y-2">
                {Array.isArray(artwork.dimensions) && artwork.dimensions.length > 0 && (
                  <>
                    <div className="text-gray-600">Dimensions</div>
                    <div>
                      {selectedSize
                        ? `${selectedSize.length} inch × ${selectedSize.width} inch`
                        : "Select a size"}
                    </div>
                  </>
                )}

                <div className="text-gray-600">Medium</div>
                <div>{state?.materials?.[0]}</div>

                {!isNotSketch && <div className="text-gray-600">Year</div>}
                {!isNotSketch && (
                  <div>{getYearFromCreatedAt(state?.createdAt)}</div>
                )}

                <div className="text-gray-600">Category</div>
                <div>{artwork.categoryName}</div>

                {!isNotSketch && <div className="text-gray-600">Surface</div>}
                {!isNotSketch && (
                  <div>
                    <p>Chitrapat ,440 gsm</p>
                  </div>
                )}

                {!isNotSketch && <div className="text-gray-600">Artwork</div>}
                {!isNotSketch && (
                  <div>
                    <p>Original</p>
                  </div>
                )}

                {!isNotSketch && (
                  <div className="text-gray-600">To be Delivered in:</div>
                )}
                {!isNotSketch && (
                  <div>
                    <p>rolled</p>
                  </div>
                )}

                {isCandle && <div className="text-gray-600">Weight</div>}
                {isCandle && (
                  <div>
                    <p>{convertToWeight(artwork?.weight)}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* About the Artist */}
          {!isNotSketch && (
            <div className="mt-auto py-4 border-t border-gray-200">
              <h2 className="font-medium text-lg mb-2">About the Artist</h2>
              <p className="text-gray-600">{artist?.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Banners (full-width, no cropping) */}
      {Array.isArray(categoryData?.galleryImages) &&
        categoryData.galleryImages.length > 0 && (
          <div className="container px-0 mt-12">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              {categoryData.galleryImages.map((b: any, i: number) => (
                <div
                  key={`banner-${i}`}
                  className="w-full bg-gray-50 rounded-lg border overflow-hidden"
                >
                  <img
                    src={b}
                    alt={`Banner ${i + 1}`}
                    className="w-full h-auto object-contain block"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Related products */}
      {Array.isArray(artwork?.relatedProducts) &&
        artwork.relatedProducts.length > 0 && (
          <RelatedProducts ids={artwork.relatedProducts} />
        )}
    </div>
  );
};

export default ArtworkDetailPage;
