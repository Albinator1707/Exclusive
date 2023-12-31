import IProduct from '@interfaces/product.interface';
import notFound from '@assets/product_not.png';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '../Button/Button';
import { useDispatch } from 'react-redux';
import { addItemToCart, removeItemFromWishlist } from '@store/actions/actions';
import TrashSvg from '@assets/Trash.svg';
import NotFound from '@assets/product_not.png';

import style from './styles.module.css';

function ProductCard (
	{product, type = 'listOfProducts'}: {product: IProduct, type?: string},
	) {
	const { id, images, title, price, description} = product;
	const wishlistDispatch = useDispatch();
	const cartQuantity = 1;

	function handleClick(e: React.MouseEvent<HTMLElement>) {
		e.preventDefault();
		wishlistDispatch(removeItemFromWishlist( id ));
	}

	function handleAddToCart(e: React.MouseEvent<HTMLButtonElement>) {
		e.preventDefault();
		wishlistDispatch(addItemToCart({...product, cartQuantity }));
	}

	return (
		<Card sx={{ maxWidth: 400, minWidth: 250, maxHeight: 'max-content', position: 'relative'}} className={style.card}>
			{
				type === 'listOfWishlist' && (
					<div onClick={handleClick} className={style.trash}>
						<img src={TrashSvg} alt="Trash Icon"/>
					</div>
				)
			}
			<CardMedia
				component="img"
				height={type === 'listOfProducts'? '200px': '350px' }
				image={images? images[0]: NotFound}
				sx={{borderRadius: '5%'}}
				alt={style.title}
				onError={(e) => {
					const imgElement = e.target as HTMLImageElement;
					imgElement.src = notFound;
				}}
			/>
			<CardContent className={style.descr}>
				<Typography gutterBottom variant="h5" component="div">
					{title?.slice(0, 15)}
				</Typography>
				<Typography gutterBottom variant="h6" component="div">
					$ {price}
				</Typography>
				<Typography variant="body2" color="text.secondary">
					{description?.slice(0,50)}
				</Typography>
					<Button appearance='filled' className={style.addToCart} onClick={handleAddToCart}>Add to card</Button>
			</CardContent>
		</Card>
	)
}

export default ProductCard;