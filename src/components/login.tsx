import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth, provider } from './firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

function Copyright(props: any) {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
			{'Copyright © '}
			<Link color="inherit" href="https://mui.com/">
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const defaultTheme = createTheme();

export default function Login() {
	const navigate = useNavigate();
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		signInWithEmailAndPassword(auth, email, password)
			.then((data) => {
				console.log(data);
				localStorage.setItem('name', data.user.displayName!);
				localStorage.setItem('email', data.user.email!);
				localStorage.setItem('picture', data.user.photoURL!);
				localStorage.setItem('phone', data.user.phoneNumber!);
				navigate('/home');
			})
			.catch((err: any) => console.log(err));
	};

	const signInWithGoogle = () => {
		signInWithPopup(auth, provider)
			.then((result) => {
				const name = result.user.displayName;
				const email = result.user.email;
				const picture = result.user.photoURL;

				localStorage.setItem('name', name!);
				localStorage.setItem('email', email!);
				localStorage.setItem('picture', picture!);
				localStorage.setItem('phone', result.user.phoneNumber!);
				navigate('/home');
			})
			.catch((error) => console.log(error));
	};

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>{/* <LockOutlinedIcon /> */}</Avatar>
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin="normal"
							required
							fullWidth
							id="email"
							label="Email Address"
							name="email"
							autoComplete="email"
							autoFocus
						/>
						<TextField
							margin="normal"
							required
							fullWidth
							name="password"
							label="Password"
							type="password"
							id="password"
							autoComplete="current-password"
						/>

						<Button className="btn" onClick={signInWithGoogle}>
							<img
								style={{ width: '20px', marginRight: '10px' }}
								src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
							/>
							Google with sign in
						</Button>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign In
						</Button>
						<Grid container>
							<Grid item xs>
								<Link href="#" variant="body2">
									Forgot password?
								</Link>
							</Grid>
							<Grid item>
								<Link href="/register" variant="body2">
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</ThemeProvider>
	);
}
