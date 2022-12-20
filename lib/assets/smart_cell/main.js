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
import "https://unpkg.com/react@18/umd/react.production.min.js";
import "https://unpkg.com/react-dom@18/umd/react-dom.production.min.js";
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
  return /* @__PURE__ */ React.createElement("div", { className: "app" }, /* @__PURE__ */ React.createElement("form", null, /* @__PURE__ */ React.createElement("div", { className: "container" }, /* @__PURE__ */ React.createElement("div", { className: "root" }, /* @__PURE__ */ React.createElement(
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
  ctx.importCSS("main.css");
  ctx.importCSS(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500&display=swap"
  );
  const root = ReactDOM.createRoot(ctx.root);
  root.render(/* @__PURE__ */ React.createElement(App, { ctx, initialAttrs: attrs }));
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL3NtYXJ0X2NlbGwvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiaW1wb3J0IFwiaHR0cHM6Ly91bnBrZy5jb20vcmVhY3RAMTgvdW1kL3JlYWN0LnByb2R1Y3Rpb24ubWluLmpzXCI7XG5pbXBvcnQgXCJodHRwczovL3VucGtnLmNvbS9yZWFjdC1kb21AMTgvdW1kL3JlYWN0LWRvbS5wcm9kdWN0aW9uLm1pbi5qc1wiO1xuXG5jb25zdCB1c2VBdHRyc1N0YXRlID0gKGN0eCwgaW5pdGlhbEF0dHJzKSA9PiB7XG4gIGNvbnN0IFthdHRycywgc2V0QXR0cnNdID0gUmVhY3QudXNlU3RhdGUoaW5pdGlhbEF0dHJzKTtcbiAgY29uc3QgdXBkYXRlQXR0ciA9IChhdHRyTmFtZSkgPT4gKGF0dHJWYWx1ZSkgPT4ge1xuICAgIGN0eC5wdXNoRXZlbnQoYHVwZGF0ZV8ke2F0dHJOYW1lfWAsIGF0dHJWYWx1ZSk7XG4gIH07XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjdHguaGFuZGxlRXZlbnQoXCJ1cGRhdGVcIiwgKHVwZGF0ZXMpID0+IHtcbiAgICAgIHNldEF0dHJzKChhdHRycykgPT4gKHsgLi4uT2JqZWN0LmFzc2lnbihhdHRycywgdXBkYXRlcykgfSkpO1xuICAgIH0pO1xuICB9LCBbXSk7XG4gIHJldHVybiBbYXR0cnMsIHVwZGF0ZUF0dHJdO1xufTtcblxuY29uc3QgRmllbGQgPSAoeyBuYW1lLCBsYWJlbCwgY2hpbGRyZW4sIGNsYXNzTmFtZSA9IFwiZmllbGQgZ3Jvd1wiIH0pID0+IChcbiAgPGRpdiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gbmFtZT17bmFtZX0+XG4gICAgPGxhYmVsIGNsYXNzTmFtZT1cImlucHV0LWxhYmVsXCI+e2xhYmVsfTwvbGFiZWw+XG4gICAge2NoaWxkcmVufVxuICA8L2Rpdj5cbik7XG5cbmNvbnN0IFNlbGVjdCA9ICh7XG4gIG5hbWUsXG4gIGxhYmVsLFxuICBvcHRpb25zLFxuICBzZWxlY3RlZE9wdGlvbixcbiAgb25DaGFuZ2UsXG4gIGZpZWxkQ2xhc3Nlcyxcbn0pID0+IChcbiAgPEZpZWxkIG5hbWU9e25hbWV9IGxhYmVsPXtsYWJlbH0gY2xhc3NOYW1lPXtmaWVsZENsYXNzZXN9PlxuICAgIDxzZWxlY3RcbiAgICAgIG5hbWU9e25hbWV9XG4gICAgICBjbGFzc05hbWU9XCJpbnB1dFwiXG4gICAgICBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICA+XG4gICAgICB7b3B0aW9ucy5tYXAoKG9wdGlvbikgPT4gKFxuICAgICAgICA8b3B0aW9uIHZhbHVlPXtvcHRpb24udmFsdWV9IHNlbGVjdGVkPXtvcHRpb24udmFsdWUgPT0gc2VsZWN0ZWRPcHRpb259PlxuICAgICAgICAgIHtvcHRpb24ubGFiZWx9XG4gICAgICAgIDwvb3B0aW9uPlxuICAgICAgKSl9XG4gICAgPC9zZWxlY3Q+XG4gIDwvRmllbGQ+XG4pO1xuXG5jb25zdCBJbnB1dCA9ICh7IG5hbWUsIGxhYmVsLCB2YWx1ZSwgb25DaGFuZ2UsIGZpZWxkQ2xhc3NlcyB9KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPEZpZWxkIG5hbWU9e25hbWV9IGxhYmVsPXtsYWJlbH0gY2xhc3NOYW1lPXtmaWVsZENsYXNzZXN9PlxuICAgICAgPGlucHV0XG4gICAgICAgIG5hbWU9e25hbWV9XG4gICAgICAgIHZhbHVlPXt2YWx1ZX1cbiAgICAgICAgY2xhc3NOYW1lPVwiaW5wdXRcIlxuICAgICAgICBvbkNoYW5nZT17KGUpID0+IG9uQ2hhbmdlKGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgIC8+XG4gICAgPC9GaWVsZD5cbiAgKTtcbn07XG5cbmNvbnN0IENoZWNrYm94ID0gKHsgbmFtZSwgbGFiZWwsIHZhbHVlLCBjaGVja2VkLCBvbkNoYW5nZSB9KSA9PiAoXG4gIDxGaWVsZCBuYW1lPXtuYW1lfSBsYWJlbD17bGFiZWx9IGNsYXNzTmFtZT17XCJyb290LWZpZWxkXCJ9PlxuICAgIDxpbnB1dFxuICAgICAgdHlwZT1cImNoZWNrYm94XCJcbiAgICAgIG5hbWU9e25hbWV9XG4gICAgICB2YWx1ZT17dmFsdWV9XG4gICAgICBjaGVja2VkPXtjaGVja2VkfVxuICAgICAgb25DaGFuZ2U9eyhlKSA9PiBvbkNoYW5nZShlLnRhcmdldC5jaGVja2VkKX1cbiAgICAvPlxuICA8L0ZpZWxkPlxuKTtcblxuY29uc3QgQXBwID0gKHsgY3R4LCBpbml0aWFsQXR0cnMgfSkgPT4ge1xuICBjb25zdCBbYXR0cnMsIHVwZGF0ZUF0dHJdID0gdXNlQXR0cnNTdGF0ZShjdHgsIGluaXRpYWxBdHRycyk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgIDxmb3JtPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm9vdFwiPlxuICAgICAgICAgICAgPElucHV0XG4gICAgICAgICAgICAgIG5hbWU9XCJjb25maWdfcGF0aFwiXG4gICAgICAgICAgICAgIHZhbHVlPXthdHRycy5jb25maWdfcGF0aH1cbiAgICAgICAgICAgICAgbGFiZWw9XCJQYXRoIHRvIEs4cyBDb25maWdcIlxuICAgICAgICAgICAgICBmaWVsZENsYXNzZXM9XCJyb290LWZpZWxkXCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZUF0dHIoXCJjb25maWdfcGF0aFwiKX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgIG5hbWU9XCJjb250ZXh0XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJDb250ZXh0XCJcbiAgICAgICAgICAgICAgb3B0aW9ucz17YXR0cnMuY29udGV4dHMubWFwKChjb250ZXh0KSA9PiAoe1xuICAgICAgICAgICAgICAgIGxhYmVsOiBjb250ZXh0LFxuICAgICAgICAgICAgICAgIHZhbHVlOiBjb250ZXh0LFxuICAgICAgICAgICAgICB9KSl9XG4gICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uPXthdHRycy5jb250ZXh0fVxuICAgICAgICAgICAgICBmaWVsZENsYXNzZXM9XCJyb290LWZpZWxkXCJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZUF0dHIoXCJjb250ZXh0XCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxDaGVja2JveFxuICAgICAgICAgICAgICBuYW1lPVwic2tpcF90bHNfdmVyaWZ5XCJcbiAgICAgICAgICAgICAgbGFiZWw9XCJJbnNlY3VyZSBTa2lwIFRMUyBWZXJpZmljYXRpb25cIlxuICAgICAgICAgICAgICBjaGVja2VkPXthdHRycy5za2lwX3Rsc192ZXJpZnl9XG4gICAgICAgICAgICAgIHZhbHVlPVwic2tpcFwiXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXt1cGRhdGVBdHRyKFwic2tpcF90bHNfdmVyaWZ5XCIpfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImJvZHlcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicm93XCI+XG4gICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBuYW1lPVwibmFtZXNwYWNlXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIk5hbWVzcGFjZVwiXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17YXR0cnMubmFtZXNwYWNlcy5tYXAoKG5zKSA9PiAoe1xuICAgICAgICAgICAgICAgICAgbGFiZWw6IG5zLFxuICAgICAgICAgICAgICAgICAgdmFsdWU6IG5zLFxuICAgICAgICAgICAgICAgIH0pKX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbj17YXR0cnMubmFtZXNwYWNlfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt1cGRhdGVBdHRyKFwibmFtZXNwYWNlXCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICA8U2VsZWN0XG4gICAgICAgICAgICAgICAgbmFtZT1cInBvZFwiXG4gICAgICAgICAgICAgICAgbGFiZWw9XCJQb2RcIlxuICAgICAgICAgICAgICAgIG9wdGlvbnM9e2F0dHJzLnBvZHMubWFwKChwb2QpID0+ICh7IGxhYmVsOiBwb2QsIHZhbHVlOiBwb2QgfSkpfVxuICAgICAgICAgICAgICAgIHNlbGVjdGVkT3B0aW9uPXthdHRycy5wb2R9XG4gICAgICAgICAgICAgICAgb25DaGFuZ2U9e3VwZGF0ZUF0dHIoXCJwb2RcIil9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDxTZWxlY3RcbiAgICAgICAgICAgICAgICBuYW1lPVwiY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICBsYWJlbD1cIkNvbnRhaW5lclwiXG4gICAgICAgICAgICAgICAgb3B0aW9ucz17YXR0cnMuY29udGFpbmVycy5tYXAoKGNvbnQpID0+ICh7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogY29udCxcbiAgICAgICAgICAgICAgICAgIHZhbHVlOiBjb250LFxuICAgICAgICAgICAgICAgIH0pKX1cbiAgICAgICAgICAgICAgICBzZWxlY3RlZE9wdGlvbj17YXR0cnMuY29udGFpbmVyfVxuICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt1cGRhdGVBdHRyKFwiY29udGFpbmVyXCIpfVxuICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9mb3JtPlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoY3R4LCBhdHRycykge1xuICBjdHguaW1wb3J0Q1NTKFwibWFpbi5jc3NcIik7XG4gIGN0eC5pbXBvcnRDU1MoXG4gICAgXCJodHRwczovL2ZvbnRzLmdvb2dsZWFwaXMuY29tL2NzczI/ZmFtaWx5PUludGVyOndnaHRANDAwOzUwMCZkaXNwbGF5PXN3YXBcIlxuICApO1xuXG4gIGNvbnN0IHJvb3QgPSBSZWFjdERPTS5jcmVhdGVSb290KGN0eC5yb290KTtcbiAgcm9vdC5yZW5kZXIoPEFwcCBjdHg9e2N0eH0gaW5pdGlhbEF0dHJzPXthdHRyc30gLz4pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9BQU87QUFDUCxPQUFPO0FBRVAsTUFBTSxnQkFBZ0IsQ0FBQyxLQUFLLGlCQUFpQjtBQUMzQyxRQUFNLENBQUMsT0FBTyxRQUFRLElBQUksTUFBTSxTQUFTLFlBQVk7QUFDckQsUUFBTSxhQUFhLENBQUMsYUFBYSxDQUFDLGNBQWM7QUFDOUMsUUFBSSxVQUFVLFVBQVUsWUFBWSxTQUFTO0FBQUEsRUFDL0M7QUFFQSxRQUFNLFVBQVUsTUFBTTtBQUNwQixRQUFJLFlBQVksVUFBVSxDQUFDLFlBQVk7QUFDckMsZUFBUyxDQUFDQSxXQUFXLG1CQUFLLE9BQU8sT0FBT0EsUUFBTyxPQUFPLEVBQUk7QUFBQSxJQUM1RCxDQUFDO0FBQUEsRUFDSCxHQUFHLENBQUMsQ0FBQztBQUNMLFNBQU8sQ0FBQyxPQUFPLFVBQVU7QUFDM0I7QUFFQSxNQUFNLFFBQVEsQ0FBQyxFQUFFLE1BQU0sT0FBTyxVQUFVLFlBQVksYUFBYSxNQUMvRCxvQ0FBQyxTQUFJLFdBQXNCLFFBQ3pCLG9DQUFDLFdBQU0sV0FBVSxpQkFBZSxLQUFNLEdBQ3JDLFFBQ0g7QUFHRixNQUFNLFNBQVMsQ0FBQztBQUFBLEVBQ2Q7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUNGLE1BQ0Usb0NBQUMsU0FBTSxNQUFZLE9BQWMsV0FBVyxnQkFDMUM7QUFBQSxFQUFDO0FBQUE7QUFBQSxJQUNDO0FBQUEsSUFDQSxXQUFVO0FBQUEsSUFDVixVQUFVLENBQUMsTUFBTSxTQUFTLEVBQUUsT0FBTyxLQUFLO0FBQUE7QUFBQSxFQUV2QyxRQUFRLElBQUksQ0FBQyxXQUNaLG9DQUFDLFlBQU8sT0FBTyxPQUFPLE9BQU8sVUFBVSxPQUFPLFNBQVMsa0JBQ3BELE9BQU8s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
