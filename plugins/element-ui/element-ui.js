import "./theme/index.css";
import Vue from "vue";
import {
  Pagination,
  Dialog,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Radio,
  RadioGroup,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Button,
  DatePicker,
  Popover,
  Tooltip,
  Slider,
  Upload,
  Image,
  Loading,
  MessageBox,
  Message
} from "element-ui";

Vue.use(Pagination);
Vue.use(Avatar);
Vue.use(Dialog);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(Checkbox);
Vue.use(CheckboxButton);
Vue.use(CheckboxGroup);
Vue.use(Button);
Vue.use(DatePicker);
Vue.use(Popover);
Vue.use(Tooltip);
Vue.use(Slider);
Vue.use(Upload);
Vue.use(Image);

Vue.use(Loading.directive);

Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$message = Message;
