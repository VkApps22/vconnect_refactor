import * as React from 'react';
import Svg, { G, Path, Ellipse, Defs, ClipPath } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function ContactIllustration(props) {
  return (
    <Svg width={216} height={196} viewBox="0 0 216 196" fill="none" {...props}>
      <G filter="url(#prefix__filter0_d)">
        <G clipPath="url(#prefix__clip0)">
          <Path
            d="M145.693 0h-86.01c-4.28 0-7.75 3.394-7.75 7.58V180.42c0 4.187 3.47 7.581 7.75 7.581h86.01c4.28 0 7.749-3.394 7.749-7.581V7.581c0-4.187-3.469-7.581-7.749-7.581z"
            fill="#062136"
          />
          <G filter="url(#prefix__filter1_ii)">
            <Path
              d="M144.144 4.17H62.008c-3.424 0-6.2 2.714-6.2 6.064v168.29c0 3.349 2.776 6.065 6.2 6.065h82.136c3.424 0 6.199-2.716 6.199-6.065V10.234c0-3.35-2.775-6.065-6.199-6.065z"
              fill="#fff"
            />
          </G>
          <Path
            d="M56.299 10.372c0-3.341 2.756-6.05 6.155-6.05h81.557c3.4 0 6.156 2.709 6.156 6.05v1.513H56.299v-1.513z"
            fill="#E6E9ED"
            fillOpacity={0.8}
          />
          <Path
            d="M105.4 22.816H60.457v6.064H105.4v-6.064zM101.525 43.929H65.881v4.548h35.644v-4.548zM115.473 54.163H65.881v3.79h49.592v-3.79zM115.473 60.985H65.881v3.79h49.592v-3.79z"
            fill="#E6E9ED"
          />
          <Path
            d="M142.593 38.812H63.556c-1.605 0-2.906 1.272-2.906 2.842V67.05c0 1.57 1.301 2.842 2.906 2.842h79.037c1.605 0 2.906-1.272 2.906-2.842V41.654c0-1.57-1.301-2.842-2.906-2.842z"
            stroke="#E6E9ED"
          />
          <Path
            d="M134.07 60.227c3.424 0 6.199-2.715 6.199-6.065 0-3.349-2.775-6.064-6.199-6.064s-6.199 2.715-6.199 6.064c0 3.35 2.775 6.065 6.199 6.065zM145.693 77.663H60.457v.379h85.236v-.38zM101.525 93.09H65.881v4.548h35.644v-4.549zM115.473 103.324H65.881v3.79h49.592v-3.79zM115.473 110.146H65.881v3.79h49.592v-3.79z"
            fill="#E6E9ED"
          />
          <Path
            d="M142.593 87.972H63.556c-1.605 0-2.906 1.273-2.906 2.843v25.395c0 1.57 1.301 2.843 2.906 2.843h79.037c1.605 0 2.906-1.273 2.906-2.843V90.815c0-1.57-1.301-2.843-2.906-2.843z"
            stroke="#E6E9ED"
          />
          <Path
            d="M134.07 109.388c3.424 0 6.199-2.715 6.199-6.065 0-3.349-2.775-6.064-6.199-6.064s-6.199 2.715-6.199 6.064c0 3.35 2.775 6.065 6.199 6.065zM145.693 126.824H60.457v.379h85.236v-.379zM101.525 140.089H65.881v4.549h35.644v-4.549zM115.473 150.324H65.881v3.79h49.592v-3.79zM115.473 157.146H65.881v3.79h49.592v-3.79z"
            fill="#E6E9ED"
          />
          <Path
            d="M142.593 134.973H63.556c-1.605 0-2.906 1.272-2.906 2.842v25.395c0 1.57 1.301 2.843 2.906 2.843h79.037c1.605 0 2.906-1.273 2.906-2.843v-25.395c0-1.57-1.301-2.842-2.906-2.842z"
            stroke="#E6E9ED"
          />
          <Path
            d="M134.07 156.388c3.424 0 6.199-2.715 6.199-6.065 0-3.349-2.775-6.064-6.199-6.064s-6.199 2.715-6.199 6.064c0 3.35 2.775 6.065 6.199 6.065zM145.693 173.824H60.457v.379h85.236v-.379z"
            fill="#E6E9ED"
          />
        </G>
      </G>
      <Ellipse cx={149.902} cy={88.805} rx={35.41} ry={34.403} fill="#00447A" />
      <Path
        d="M140.232 76.764c.107 1.531.372 3.028.797 4.456l-2.124 2.064a24.851 24.851 0 01-1.346-6.52h2.673zm17.457 20.677a23.19 23.19 0 004.604.774v2.563a28.009 28.009 0 01-6.728-1.29l2.124-2.047zm-15.757-24.117h-6.197c-.973 0-1.77.774-1.77 1.72 0 16.152 13.473 29.243 30.098 29.243.974 0 1.771-.774 1.771-1.72v-6.004c0-.946-.797-1.72-1.771-1.72-2.195 0-4.337-.344-6.32-.98a1.527 1.527 0 00-.549-.086 1.84 1.84 0 00-1.257.498l-3.895 3.785c-5.011-2.494-9.118-6.468-11.668-11.336l3.895-3.784a1.693 1.693 0 00.443-1.755 19.037 19.037 0 01-1.009-6.14c0-.947-.797-1.721-1.771-1.721z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M206.259 19.18h-1.765v6.966h-6.998v1.757h6.998v6.967h1.765v-6.967h6.999v-1.757h-6.999v-6.967zM10.227 157.527h-1.57v6.192h-6.22v1.562h6.22v6.193h1.57v-6.193h6.22v-1.562h-6.22v-6.192zM24.196 18.27H23.02v4.645h-4.665v1.172h4.666v4.644h1.176v-4.645h4.666v-1.171h-4.666v-4.644z"
        fill="#00A0D1"
      />
      <Defs>
        <ClipPath id="prefix__clip0">
          <Path
            fill="#fff"
            transform="translate(51.934)"
            d="M0 0h101.508v188H0z"
          />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default ContactIllustration;