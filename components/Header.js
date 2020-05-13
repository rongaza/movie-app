import { useState } from 'react';
import Link from 'next/link';
import { makeStyles, fade, AppBar, Toolbar, Typography, Button, InputBase, Menu, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';

const linkStyle = {
	marginRight: 15,
};

import React from 'react';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		marginBottom: theme.spacing(2),
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
		textDecoration: 'none',
	},
	inputRoot: {
		color: 'inherit',
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25),
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing(1),
			width: 'auto',
		},
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
}));

const Header = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const classes = useStyles();
	const open = Boolean(anchorEl);

	const handleOpenMenu = () => {
		let loc = document.getElementById('menu-appbar');
		setAnchorEl(loc);
	};
	const handleClick = () => {
		setAnchorEl(null);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static" color="primary">
				<Toolbar>
					<Typography variant="h5" className={classes.title}>
						Movie Explorer
					</Typography>

					<Link href="/">
						<Button color="inherit">Home</Button>
					</Link>

					<Link href="/search">
						<IconButton aria-label="search" color="inherit">
							<SearchIcon />
						</IconButton>
					</Link>
					<div id="menu-appbar">
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
							<MenuItem>
								<Link href="/lists">
									<Typography>My Lists</Typography>
								</Link>
							</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Header;
