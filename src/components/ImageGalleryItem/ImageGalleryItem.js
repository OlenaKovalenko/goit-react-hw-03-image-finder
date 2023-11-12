import '../../styles.css';

export const ImageGalleryItem = ({ item: { webformatURL, tags } }) => {
    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} />
        </li>
    )
}