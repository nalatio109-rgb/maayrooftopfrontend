const fs = require('fs');
let css = fs.readFileSync('src/App.css', 'utf-8');

// Body background
css = css.replace(/body\s*\{\s*font-family:\s*"Be Vietnam Pro",\s*sans-serif;\s*background:\s*radial-gradient\(circle at 50% 10%,\s*#1a3a29 0%,\s*#081c11 60%,\s*#041009 100%\);\s*background-attachment:\s*fixed;\s*color:\s*#fff;\s*\}/s, 'body {\n  font-family: "Be Vietnam Pro", sans-serif;\n  background: #fdfdfd;\n  color: #1a3a29;\n}');

// Hero
css = css.replace(/\.heroText h1 \{/g, '.heroText h1 {\n  color: #fff;');
css = css.replace(/\.heroBenefits span \{/g, '.heroBenefits span {\n  color: #fff;');
css = css.replace(/\.heroBenefits p \{/g, '.heroBenefits p {\n  color: #fff;');

// Navbar (Ensure white color)
css = css.replace(/\.nav a \{\s*font-size: 15px;\s*font-weight: 600;\s*color: #fff;\s*transition: 0.25s;\s*\}/s, '.nav a {\n  font-size: 15px;\n  font-weight: 600;\n  color: #fff;\n  transition: 0.25s;\n}');

// Features
css = css.replace(/\.featureCard \{\s*position: relative;\s*min-height: 158px;\s*padding: 54px 28px 26px;\s*text-align: center;\s*border: 1.5px solid #ffbf2e;\s*border-radius: 16px;\s*background: rgba\(9, 25, 15, 0.96\);\s*\}/s, '.featureCard {\n  position: relative;\n  min-height: 158px;\n  padding: 54px 28px 26px;\n  text-align: center;\n  border: 1.5px solid #a3c4b1;\n  border-radius: 16px;\n  background: #ffffff;\n  box-shadow: 0 10px 20px rgba(0,0,0,0.05);\n}');
css = css.replace(/\.featureIcon \{\s*width: 84px;\s*height: 84px;\s*border: 2px solid #ffbf2e;\s*border-radius: 50%;\s*display: grid;\s*place-items: center;\s*background: #091c11;\s*color: #ffbf2e;/s, '.featureIcon {\n  width: 84px;\n  height: 84px;\n  border: 2px solid #2e8b57;\n  border-radius: 50%;\n  display: grid;\n  place-items: center;\n  background: #ffffff;\n  color: #2e8b57;');
css = css.replace(/\.featureCard h3 \{\s*color: #ffbf2e;/g, '.featureCard h3 {\n  color: #1a3a29;');
css = css.replace(/\.featureCard p \{\s*color: #f4e9ff;/g, '.featureCard p {\n  color: #3b5c49;');

// Products Title
css = css.replace(/\.sectionTitle h2 \{\s*color: #ffbf2e;/g, '.sectionTitle h2 {\n  color: #1a3a29;');
css = css.replace(/\.sectionTitle span \{\s*width: 26px;\s*height: 3px;\s*background: #ffbf2e;/g, '.sectionTitle span {\n  width: 26px;\n  height: 3px;\n  background: #2e8b57;');
css = css.replace(/\.viewAllBtn \{\s*display: block;\s*margin-left: auto;\s*margin-bottom: 18px;\s*padding: 10px 18px;\s*border-radius: 999px;\s*background: transparent;\s*color: #ffbf2e;\s*border: 1px solid #ffbf2e;/s, '.viewAllBtn {\n  display: block;\n  margin-left: auto;\n  margin-bottom: 18px;\n  padding: 10px 18px;\n  border-radius: 999px;\n  background: transparent;\n  color: #2e8b57;\n  border: 1px solid #2e8b57;');

// Arrow btn
css = css.replace(/\.arrowBtn \{\s*min-width: 44px;\s*height: 44px;\s*border-radius: 50%;\s*background: transparent;\s*border: 1.5px solid #ffbf2e;\s*color: #ffbf2e;/s, '.arrowBtn {\n  min-width: 44px;\n  height: 44px;\n  border-radius: 50%;\n  background: transparent;\n  border: 1.5px solid #a3c4b1;\n  color: #1a3a29;');

// Product Card
css = css.replace(/background: #11301d;\s*border: 1px solid rgba\(255, 255, 255, 0.08\);/g, 'background: #ffffff;\n  border: 1px solid #e0ede5;');
css = css.replace(/box-shadow: 0 10px 30px rgba\(0, 0, 0, 0.5\);/g, 'box-shadow: 0 15px 35px rgba(26,58,41,0.08);');
css = css.replace(/background: radial-gradient\(circle at top right, rgba\(46, 139, 87, 0.15\), transparent 60%\);/g, 'background: radial-gradient(circle at top right, rgba(46, 139, 87, 0.05), transparent 60%);');
css = css.replace(/\.productCard\.horizontal h4 \{\s*font-size: 26px;\s*color: #fff;/g, '.productCard.horizontal h4 {\n  font-size: 26px;\n  color: #1a3a29;');
css = css.replace(/\.productDesc \{\s*display: flex;\s*align-items: center;\s*gap: 8px;\s*padding: 6px 20px;\s*border: 1px solid rgba\(255, 191, 46, 0.4\);\s*border-radius: 999px;\s*font-size: 13px;\s*color: #e0d4f5;\s*margin-bottom: 20px;\s*background: rgba\(0, 0, 0, 0.3\);/s, '.productDesc {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  padding: 6px 20px;\n  border: 1px solid #c3d9cc;\n  border-radius: 999px;\n  font-size: 13px;\n  color: #3b5c49;\n  margin-bottom: 20px;\n  background: #f4fbf7;');
css = css.replace(/\.leafIcon \{\s*font-size: 16px;\s*color: #ffbf2e;/g, '.leafIcon {\n  font-size: 16px;\n  color: #2e8b57;');
css = css.replace(/\.descIcon \{\s*color: #ffbf2e;/g, '.descIcon {\n  color: #2e8b57;');

// Footer
css = css.replace(/\.footerLogo h2 \{/g, '.footerLogo h2 {\n  color: #1a3a29;');
css = css.replace(/\.footerLogo span \{\s*color: #ffbf2e;/g, '.footerLogo span {\n  color: #2e8b57;');
css = css.replace(/\.footerCol h3 \{\s*color: #ffbf2e;/g, '.footerCol h3 {\n  color: #2e8b57;');
css = css.replace(/\.footerCol p \{\s*font-size: 14px;\s*margin-bottom: 9px;\s*color: #f2e7ff;/g, '.footerCol p {\n  font-size: 14px;\n  margin-bottom: 9px;\n  color: #3b5c49;');
css = css.replace(/\.copyright \{\s*grid-column: 1 \/ -1;\s*text-align: center;\s*padding-top: 18px;\s*color: #c9b9d2;/s, '.copyright {\n  grid-column: 1 / -1;\n  text-align: center;\n  padding-top: 18px;\n  color: #8fa898;');
css = css.replace(/border-top: 1px solid rgba\(255, 191, 46, 0.3\);/g, 'border-top: 1px solid #c3d9cc;');
css = css.replace(/border-left: 1px solid rgba\(255, 191, 46, 0.45\);/g, 'border-left: 1px solid #c3d9cc;');
css = css.replace(/border-top: 1px solid rgba\(255, 255, 255, 0.08\);/g, 'border-top: 1px solid #e0ede5;');

const leavesCSS = `
.floating-leaves-bg {
  position: absolute;
  top: 600px; left: 0; width: 100%; height: calc(100% - 600px);
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}
.leaf-anim {
  position: absolute;
  font-size: 32px;
  opacity: 0.25;
  animation: floatLeaf 15s infinite linear;
}
.leaf1 { top: 5%; left: 5%; animation-duration: 20s; font-size: 42px; }
.leaf2 { top: 15%; right: 10%; animation-duration: 18s; animation-delay: -5s; }
.leaf3 { top: 40%; left: 15%; animation-duration: 22s; font-size: 28px; }
.leaf4 { top: 60%; right: 5%; animation-duration: 16s; animation-delay: -2s; font-size: 36px; }
.leaf5 { top: 85%; left: 50%; animation-duration: 19s; animation-delay: -10s; }

@keyframes floatLeaf {
  0% { transform: translateY(0) rotate(0deg) translateX(0); }
  50% { transform: translateY(-30px) rotate(180deg) translateX(20px); }
  100% { transform: translateY(0) rotate(360deg) translateX(0); }
}
`;

if (!css.includes('.floating-leaves-bg')) {
  css += '\\n' + leavesCSS;
}

fs.writeFileSync('src/App.css', css);
