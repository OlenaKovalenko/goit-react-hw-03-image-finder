export const ImageGalleryItem = ({ item: { webformatURL } }) => {
    return (
        <li class="gallery-item">
            <img src={webformatURL} alt="photo" />
        </li>
    )
}