'use client';

import { useParams } from 'next/navigation';
import ProductDetailsRelatedProducts from '@/app/shared/module/events/product-details-related-products';
import ProductDetailsDescription from '@/app/shared/module/events/product-details-description';
import ProductDeliveryOptions from '@/app/shared/module/events/product-delivery-options';
import ProductDetailsGallery from '@/app/shared/module/events/product-details-gallery';
import ProductDetailsSummery from '@/app/shared/module/events/product-details-summery';
import ProductDetailsReview from '@/app/shared/module/events/product-details-review';
import { modernProductsGrid } from '@/data/shop-products';
import { generateSlug } from '@/utils/generate-slug';

export default function ProductDetails() {
  const params = useParams();
  const product =
    modernProductsGrid.find(
      (item) => generateSlug(item.title) === params.slug
    ) ?? modernProductsGrid[0];

  return (
    <>
      <ProductDetailsRelatedProducts />
    </>
  );
}
