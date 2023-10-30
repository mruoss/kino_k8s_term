var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
const useAttrsState = (ctx, initialAttrs) => {
  const [attrs, setAttrs] = React.useState(initialAttrs);
  const updateAttr = (attrName) => (attrValue) => {
    ctx.pushEvent(`update_${attrName}`, attrValue);
  };
  React.useEffect(() => {
    ctx.handleEvent("update", (updates) => {
      setAttrs((attrs2) => __spreadValues({}, Object.assign(attrs2, updates)));
    });
  }, []);
  return [attrs, updateAttr];
};
const Field = ({ name, label, children, className = "field grow" }) => /* @__PURE__ */ React.createElement("div", { className, name }, /* @__PURE__ */ React.createElement("label", { className: "input-label" }, label), children);
const Select = ({
  name,
  label,
  options,
  selectedOption,
  onChange,
  fieldClasses
}) => /* @__PURE__ */ React.createElement(Field, { name, label, className: fieldClasses }, /* @__PURE__ */ React.createElement(
  "select",
  {
    name,
    className: "input",
    onChange: (e) => onChange(e.target.value)
  },
  options.map((option) => /* @__PURE__ */ React.createElement("option", { value: option.value, selected: option.value == selectedOption }, option.label))
));
const Input = ({ name, label, value, onChange, fieldClasses }) => {
  return /* @__PURE__ */ React.createElement(Field, { name, label, className: fieldClasses }, /* @__PURE__ */ React.createElement(
    "input",
    {
      name,
      value,
      className: "input",
      onChange: (e) => onChange(e.target.value)
    }
  ));
};
const Checkbox = ({ name, label, value, checked, onChange }) => /* @__PURE__ */ React.createElement(Field, { name, label, className: "root-field" }, /* @__PURE__ */ React.createElement(
  "input",
  {
    type: "checkbox",
    name,
    value,
    checked,
    onChange: (e) => onChange(e.target.checked)
  }
));
const App = ({ ctx, initialAttrs }) => {
  const [attrs, updateAttr] = useAttrsState(ctx, initialAttrs);
  return /* @__PURE__ */ React.createElement("div", { className: "app" }, /* @__PURE__ */ React.createElement("p", { className: "note" }, "This Kino is deprecated. Use :kino_k8s instead."), /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "root" }, /* @__PURE__ */ React.createElement(
    Input,
    {
      name: "config_path",
      value: attrs.config_path,
      label: "Path to K8s Config",
      fieldClasses: "root-field",
      onChange: updateAttr("config_path")
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      name: "context",
      label: "Context",
      options: attrs.contexts.map((context) => ({
        label: context,
        value: context
      })),
      selectedOption: attrs.context,
      fieldClasses: "root-field",
      onChange: updateAttr("context")
    }
  ), /* @__PURE__ */ React.createElement(
    Checkbox,
    {
      name: "skip_tls_verify",
      label: "Insecure Skip TLS Verification",
      checked: attrs.skip_tls_verify,
      value: "skip",
      onChange: updateAttr("skip_tls_verify")
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "body" }, /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement(
    Select,
    {
      name: "namespace",
      label: "Namespace",
      options: attrs.namespaces.map((ns) => ({
        label: ns,
        value: ns
      })),
      selectedOption: attrs.namespace,
      onChange: updateAttr("namespace")
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      name: "pod",
      label: "Pod",
      options: attrs.pods.map((pod) => ({ label: pod, value: pod })),
      selectedOption: attrs.pod,
      onChange: updateAttr("pod")
    }
  ), /* @__PURE__ */ React.createElement(
    Select,
    {
      name: "container",
      label: "Container",
      options: attrs.containers.map((cont) => ({
        label: cont,
        value: cont
      })),
      selectedOption: attrs.container,
      onChange: updateAttr("container")
    }
  ))))));
};
export function init(ctx, attrs) {
  return __async(this, null, function* () {
    yield ctx.importCSS("main.css");
    yield ctx.importCSS(
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
    );
    yield ctx.importJS("https://unpkg.com/react@18/umd/react.development.js");
    yield ctx.importJS(
      "https://unpkg.com/react-dom@18.2.0/umd/react-dom.development.js"
    );
    const root = ReactDOM.createRoot(ctx.root);
    root.render(/* @__PURE__ */ React.createElement(App, { ctx, initialAttrs: attrs }));
  });
}
