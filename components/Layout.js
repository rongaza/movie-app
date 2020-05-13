import Head from 'next/head';
import Header from './Header';

const layoutStyle = {};

const Layout = (props) => {
	return (
		<div>
			<Header />
			{props.children}
		</div>
	);
};

export default Layout;
