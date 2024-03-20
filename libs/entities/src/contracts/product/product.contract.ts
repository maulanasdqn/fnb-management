
export type TCProductListResponse ={
    id:string
    name :string
    priceSelling :number
    image:string
    description : string
}

export type TCProductQueryParams = {
    id?: string
    search?:string
    productCategoryId? : string
}