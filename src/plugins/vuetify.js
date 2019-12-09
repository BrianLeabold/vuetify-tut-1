import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    themes: {
      light: {
        primary: colors.indigo.darken4,
        success: colors.green.darken3,
        info: colors.grey.lighten2,
        error: colors.red.darken2
      },
    },
  },
});
