export interface Furniture {
    name: string,
    city: string,
    description: string,
    owner: string,
    images: Image[],
    _id: string
}

export interface Image {
    _id: string,
    url: string
}