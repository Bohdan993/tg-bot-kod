export const findRelatedServices = (id, products, branch) => {
    
    const relatedProductsIds = products?.find(product => product?.variations?.[0]?.id === id)?.variations?.[0]?.related_products;

    const relatedProducts = relatedProductsIds?.map(id => {
        return branch?.attached_products?.find(product => product?.id === id?.id);
    })

    return relatedProducts;
}