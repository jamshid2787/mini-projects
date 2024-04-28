import React from 'react';
import { Logo } from '../assets/images';

export default function Footer() {
	return (
		<>
			<div className="footer">
				<div>
					<ul>
						<li>
							<img style={{ width: '250px' }} src={Logo} alt="" />
						</li>
						<li>
							Weit hinter, hinter den Wortbergen, fern der Lander <br /> Vokalien und Konsonanties
							leben die Blindtexte. <br /> Abgeschieden wohmen sie.
						</li>
					</ul>
					<ul>
						<li>MENU</li>
						<li>Turniere</li>
						<li>Regelwerk</li>
						<li>Partner</li>
						<li>Teams</li>
						<li>Deine Teams</li>
					</ul>
					<ul>
						<li>SOCIAL MEDIA</li>
						<li>Twitch</li>
						<li>Facebook</li>
						<li>Twitter</li>
						<li>Discord</li>
					</ul>
					<ul>
						<li>KONTAKT</li>
						<li>Hast du allgemeine Fragen?</li>
						<li>Discord server</li>
						<li>Hast du eine Bussinessanfrage?</li>
						<li>Kontakt</li>
					</ul>
				</div>
			</div>
		</>
	);
}
