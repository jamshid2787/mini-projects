import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},

	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function App() {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<>
			<AppBar position="absolute">
				<Container maxWidth="xl">
					<Toolbar disableGutters>
						<Typography
							variant="h6"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: 'none', md: 'flex' },
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							LOGO
						</Typography>

						<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
							<IconButton
								size="large"
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleOpenNavMenu}
								color="inherit"
							></IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorElNav}
								anchorOrigin={{
									vertical: 'bottom',
									horizontal: 'left',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'left',
								}}
								open={Boolean(anchorElNav)}
								onClose={handleCloseNavMenu}
								sx={{
									display: { xs: 'block', md: 'none' },
								}}
							>
								{pages.map((page) => (
									<MenuItem key={page} onClick={handleCloseNavMenu}>
										<Typography textAlign="center">{page}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
						<Typography
							variant="h5"
							noWrap
							component="a"
							href="#app-bar-with-responsive-menu"
							sx={{
								mr: 2,
								display: { xs: 'flex', md: 'none' },
								flexGrow: 1,
								fontFamily: 'monospace',
								fontWeight: 700,
								letterSpacing: '.3rem',
								color: 'inherit',
								textDecoration: 'none',
							}}
						>
							LOGO
						</Typography>
						<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
							{pages.map((page) => (
								<Button
									key={page}
									onClick={handleCloseNavMenu}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page}
								</Button>
							))}
						</Box>

						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
									<Avatar
										alt={`${localStorage.getItem('name')}`}
										src={`${localStorage.getItem('picture')}`}
									/>
								</IconButton>
							</Tooltip>
							<Button
								onClick={() => {
									localStorage.clear();
									navigate('/');
								}}
								style={{ marginLeft: '20px' }}
								variant="outlined"
								color="error"
							>
								Log Out
							</Button>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem key={setting} onClick={handleCloseUserMenu}>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					</Toolbar>
				</Container>
			</AppBar>
			<TableContainer component={Paper} sx={{ maxWidth: '80%' }}>
				<Table sx={{ width: '100%' }} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell align="right">Email</StyledTableCell>
							<StyledTableCell align="right">Phone</StyledTableCell>
							<StyledTableCell align="right">PhotoUrl</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<StyledTableRow>
							<StyledTableCell component="th" scope="row">
								{localStorage.getItem('name')}
							</StyledTableCell>
							<StyledTableCell align="right">{localStorage.getItem('email')}</StyledTableCell>
							<StyledTableCell align="right">{localStorage.getItem('phone')}</StyledTableCell>
							<StyledTableCell align="right">{localStorage.getItem('picture')}</StyledTableCell>
						</StyledTableRow>
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
export default App;
