const fs = require('fs');
const yaml = require('js-yaml');
const homeDir = require('home-dir');

const path = homeDir('/.hyper_plugins/node_modules/hyper-star-wars/backgrounds/');
const extension = '.png';

exports.decorateConfig = config => {
	let theme;
	let keys;
	let index;
	const getTheme = Array.isArray(config.character) ? config.character[Math.floor(Math.random() * config.character.length)] : config.character;
	let starWarsTheme = getTheme.toLowerCase();
	const unibody = config.unibody;
	const unibodyFlag = unibody !== 'false';

	// Load color palettes from yaml files
	const charactersYml = yaml.safeLoad(
		fs.readFileSync(
			homeDir('/.hyper_plugins/node_modules/hyper-star-wars/characters.yml'),
			'utf8'
		)
	);

	// Determine theme color palette
	if (starWarsTheme === 'random') {
		keys = Object.keys(charactersYml.characters);
		index = Math.floor(Math.random() * (keys.length));
		starWarsTheme = keys[index];
	}

	if (Object.prototype.hasOwnProperty.call(charactersYml.characters, starWarsTheme)) {
		theme = charactersYml.characters[starWarsTheme];
	} else {
		theme = charactersYml.default.yoda;
	}

	// Set theme colors
	const primary = (unibodyFlag === true) ? theme.unibody : theme.header;
	const fontColor = theme.font;
	const selectedColor = theme.header;
	const themeBlack = theme.black;
	const themeRed = theme.red;
	const themeGreen = theme.green;
	const themeYellow = theme.yellow;
	const themeBlue = theme.blue;
	const themeMagenta = theme.magenta;
	const themeCyan = theme.cyan;
	const themeWhite = theme.white;
	const themeLightBlack = theme.lightBlack;
	const themeLightRed = theme.lightRed;
	const themeLightGreen = theme.lightGreen;
	const themeLightYellow = theme.lightYellow;
	const themeLightBlue = theme.lightBlue;
	const themeLightMagenta = theme.lightMagenta;
	const themeLightCyan = theme.lightCyan;
	const themeLightWhite = theme.lightWhite;

	const syntax = {
		dark: {
			borderColor: primary,
			cursorColor: fontColor,
			foregroundColor: fontColor,
			backgroundColor: '#fff',
			colors: {
				black: themeBlack,
				red: themeRed,
				green: themeGreen,
				yellow: themeYellow,
				blue: themeBlue,
				magenta: themeMagenta,
				cyan: themeCyan,
				white: themeWhite,
				lightBlack: themeLightBlack,
				lightRed: themeLightRed,
				lightGreen: themeLightGreen,
				lightYellow: themeLightYellow,
				lightBlue: themeLightBlue,
				lightMagenta: themeLightMagenta,
				lightCyan: themeLightCyan,
				lightWhite: themeLightWhite
			}
		}
	};

	let pathToTheme;
	const assemblePath = path + starWarsTheme + extension;

	if (process.platform === 'win32') {
		pathToTheme = assemblePath.replace(/\\/g, '/');
	} else {
		pathToTheme = assemblePath;
	}

	return Object.assign({}, config,
		syntax.dark, {
			termCSS: `
          ${config.termCSS || ''}
          ::selection {
            background: ${selectedColor} !important;
          }
          ::-webkit-scrollbar-thumb {
            background-color: ${fontColor};
            -webkit-box-shadow: none;
					}
          x-screen {
            background: transparent !important;
          }
        `,
			css: `
        ${config.css || ''}
        .terms_terms {
          background: url(file://${pathToTheme}) center;
          background-size: cover;
        }
        .header_header, .header_windowHeader {
          background-color: ${primary} !important;
        }
        .tabs_nav .tabs_list {
          border-bottom: 0;
        }
        .tabs_nav .tabs_title,
        .tabs_nav .tabs_list .tab_tab {
          color: ${fontColor};
          border: 0;
        }
        .tab_icon {
          color: ${fontColor};
        }
        .tab_icon:hover {
          background-color: ${fontColor};
        }
        .tabs_nav .tabs_list .tab_tab:not(.tab_active) {
          background-color: rgba(0,0,0,0.1);
        }
        .tabs_nav .tabs_list {
          color: ${primary};
        }
        .tabs_nav .tabs_list .tab_active .tab_text {
          border-bottom: 3px solid ${fontColor};
        }
        .terms_terms .terms_termGroup .splitpane_panes .splitpane_divider {
          background-color: ${fontColor} !important;
        }
      `
		}
	);
};
