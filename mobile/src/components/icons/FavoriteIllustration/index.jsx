import * as React from 'react';
import Svg, { G, Path, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function FavoriteIllustration(props) {
  return (
    <Svg width={220} height={96} viewBox="0 0 220 96" fill="none" {...props}>
      <G clipPath="url(#prefix__clip0)">
        <Path
          d="M55.51 32H36.73c-2.592 0-4.694 2.09-4.694 4.667v18.666c0 2.578 2.102 4.667 4.695 4.667h18.778c2.593 0 4.695-2.09 4.695-4.667V36.667c0-2.578-2.102-4.667-4.695-4.667z"
          fill="#E0F2FE"
        />
        <Path
          d="M176.898 32H66.239v8h110.659v-8zM154.766 46H66.239v6h88.527v-6zM132.634 54H66.239v6h66.395v-6z"
          fill="#F3F3F3"
        />
        <Path
          d="M183.381 26H29.577C27.6 26 26 27.99 26 30.444v31.112C26 64.01 27.601 66 29.577 66H183.38c1.976 0 3.577-1.99 3.577-4.444V30.444c0-2.454-1.601-4.444-3.577-4.444z"
          stroke="#F3F3F3"
          strokeWidth={2}
        />
        <G filter="url(#prefix__filter0_d)">
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M171.868 66l-3.209-3.165c-11.398-11.198-18.923-18.583-18.923-27.647 0-7.385 5.357-13.188 12.173-13.188 3.851 0 7.547 1.942 9.959 5.011 2.413-3.069 6.108-5.011 9.959-5.011C188.644 22 194 27.803 194 35.188c0 9.064-7.525 16.45-18.923 27.67L171.868 66z"
            fill="#00A0D1"
          />
        </G>
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.476 6.323h-1.495v5.93H6.05v1.495h5.93v5.929h1.495v-5.93h5.93v-1.495h-5.93V6.323zM144.978 79.065h-1.329v5.27h-5.27v1.33h5.27v5.27h1.329v-5.27h5.271v-1.33h-5.271v-5.27zM211.983 8.862h-.997v3.953h-3.952v.997h3.952v3.953h.997v-3.953h3.953v-.997h-3.953V8.862z"
          fill="#E0F2FE"
        />
      </G>
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path fill="#fff" d="M0 0h220v96H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default FavoriteIllustration;
