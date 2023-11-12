import '../../styles.css';

export const ImageGalleryItem = ({ item: { webformatURL } }) => {
    return (
        <li className="ImageGalleryItem">
            <img className="ImageGalleryItem-image" src={webformatURL} alt="photo" />
        </li>
    )
}