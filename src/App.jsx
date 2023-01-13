import React from 'react';
import GlobalStyle from './globalStyles';
import Routers from './Route';
import AnimationThemeProvider from './_helper/AnimationTheme/AnimationThemeProvider';
import CustomizerProvider from './_helper/Customizer/CustomizerProvider';
import i18n from './i18n';


const App = () => (
  <div className="App">
    <CustomizerProvider>
      <GlobalStyle />
      <AnimationThemeProvider>
        <Routers />
      </AnimationThemeProvider>
    </CustomizerProvider>
  </div>
);

export default App;
