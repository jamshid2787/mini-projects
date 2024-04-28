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
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider } from './firebase';
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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Register() {
	const navigate = useNavigate();
	const handleSubmit = (event: any) => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		createUserWithEmailAndPassword(auth, email, password)
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
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="new-password"
								/>
							</Grid>
							<Grid item xs={12}></Grid>
						</Grid>
						<Button className="btn" onClick={signInWithGoogle}>
							<img
								style={{ width: '20px', marginRight: '10px' }}
								src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
							/>
							Google with sign in
						</Button>
						<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
						<Grid container justifyContent="flex-end">
							<Grid item>
								<Link href="/login" variant="body2">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	);
}
