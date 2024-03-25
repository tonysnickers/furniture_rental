export interface Furniture {
    name: string,
    city: string,
    description: string,
    owner: string,
    images: image[],
    _id: string
}

export interface image {
    _id: string,
    url: string
}