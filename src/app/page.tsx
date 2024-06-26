"use client";

import Chip from "@/app/components/Chip";
import RestaurantListEmptyState from "@/app/components/EmptyState/RestaurantListEmptyState";
import RestaurantCard from "@/app/components/RestaurantCard";
import SearchBar from "@/app/components/SearchBar";
import { useDebounce } from "@/app/hooks/useDebounce";
import { getListCategory } from "@/utils";
import { trpc } from "@/utils/trpc";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const category = searchParams.get("category") || undefined;

  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 200);

  const {
    data: restaurants,
    isLoading,
    refetch,
  } = trpc.restaurant.getRestaurants.useQuery({
    search: debouncedSearch,
    category,
  });

  const { mutateAsync } = trpc.restaurant.addFavorite.useMutation({
    onSuccess: (data) => {
      if (data.success) {
        toast.success(data.message);
        refetch();
      } else {
        toast.error(data.message);
      }
    },
  });

  const handleChange = (value: string, key: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!!value) {
      params.set(key, value);
      router.replace(`${pathname}?${params}`);
    } else {
      params.delete(key);
      router.replace(`${pathname}?${params}`);
    }
  };

  const handleFavorite = async (id: string) => {
    await mutateAsync({ id });
  };

  return (
    <div className="">
      <SearchBar value={search} onChange={(v) => setSearch(v)} />
      <div className="h-6" />
      <Chip.List
        data={getListCategory()}
        onChange={(value) => {
          handleChange(value, "category");
        }}
      />
      <div className="h-6" />
      <div className="grid grid-cols-1	md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4">
        {isLoading ? (
          <RestaurantListEmptyState />
        ) : (
          restaurants?.map((data, index) => (
            <RestaurantCard
              data={data}
              key={index}
              onFavorite={handleFavorite}
            />
          ))
        )}
      </div>
    </div>
  );
}
