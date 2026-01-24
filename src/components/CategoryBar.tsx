import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchMenus, MenuItem } from "@/store/slices/MenuSlice";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MenuTreeItem extends MenuItem {
  children: MenuTreeItem[];
}

const CategoryBar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { menus, loading } = useSelector((state: RootState) => state.menus);
  const [tree, setTree] = useState<MenuTreeItem[]>([]);

  // useEffect removal - handled by AppContent
  
  useEffect(() => {
    // console.log("CategoryBar menus state:", menus);
    if (menus && menus.length > 0) {
      const menuMap: { [key: string]: MenuTreeItem } = {};
      const roots: MenuTreeItem[] = [];

      // Initialize items with empty children array
      menus.forEach((item) => {
        menuMap[item.id] = { ...item, children: [] };
      });

      // Build tree
      menus.forEach((item) => {
        const isRoot = !item.parentId || item.parentId === "null" || item.parentId === "";
        if (!isRoot && menuMap[item.parentId!]) {
          menuMap[item.parentId!].children.push(menuMap[item.id]);
        } else if (isRoot) {
          roots.push(menuMap[item.id]);
        }
      });

      // Sort by displayOrder
      const sortItems = (items: MenuTreeItem[]) => {
        items.sort((a, b) => (Number(a.displayOrder) || 0) - (Number(b.displayOrder) || 0));
        items.forEach((item) => {
          if (item.children.length > 0) {
            sortItems(item.children);
          }
        });
      };

      sortItems(roots);
      setTree(roots);
    }
  }, [menus]);

  const handleCategoryClick = (item: MenuItem) => {
    navigate(`/${item.slug.replace(/\s+/g, "-")}`, { state: { id: item.id, isMenu: true, isCategory: item.isCategory } });
  };

  if (loading) return null;

  return (
    <div className="bg-[#FAF9F6] border-b border-gray-100 hidden md:block">
      <div className="container mx-auto px-4">
        <ul className="flex items-center space-x-10 h-11 whitespace-nowrap">
          {tree.map((parent) => (
            <li key={parent.id} className="relative group h-full flex items-center">
              <button
                onClick={() => handleCategoryClick(parent)}
                className="flex items-center gap-1.5 text-[13px] uppercase tracking-wider font-semibold text-gray-800 hover:text-primary transition-all duration-300 h-full relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full"
              >
                {parent.name}
                {parent.children.length > 0 && (
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400 group-hover:text-primary transition-colors" />
                )}
              </button>

              {/* Submenu - Premium Unified Block (Dropdown Style) */}
              {parent.children.length > 0 && (
                <div className="absolute top-[100%] left-0 w-[220px] bg-white shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-b-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible z-[100] py-5 px-5 border border-gray-50 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300 ease-out">
                  <div className="flex flex-col space-y-6">
                    {parent.children.map((child) => (
                      <div key={child.id} className="flex flex-col space-y-3">
                        <button
                          onClick={() => handleCategoryClick(child)}
                          className="text-[13px] text-gray-500 hover:text-primary hover:translate-x-1 transition-all duration-200 text-left"
                        >
                          {child.name}
                        </button>

                        {child.children.length > 0 && (
                          <div className="flex flex-col space-y-2">
                            {child.children.map((grandChild) => (
                              <button
                                key={grandChild.id}
                                onClick={() => handleCategoryClick(grandChild)}
                                className="text-[13px] text-gray-500 hover:text-primary hover:translate-x-1 transition-all duration-200 text-left"
                              >
                                {grandChild.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoryBar;
