import "https://cdn.jsdelivr.net/npm/xterm@5.0.0/lib/xterm.min.js";

let k8s_xterm;

const openTerminal = (ctx) => {
  k8s_xterm = new Terminal();
  k8s_xterm.onKey((key) => {
    console.log(key);
    ctx.pushEvent("key", key.key);
  });
  k8s_xterm.open(ctx.root.querySelector(".k8s-xtermjs-container"));
  k8s_xterm.focus();
};

export function init(ctx, attrs) {
  ctx.importCSS("https://cdn.jsdelivr.net/npm/xterm@5.0.0/css/xterm.css");

  ctx.root.innerHTML = `
    <div id="k8s-terminal">
      <div class="k8s-xtermjs-container"></div>
    </div>
  `;

  if (attrs.term_pid) {
    console.log("opening terminal");
    setTimeout(() => openTerminal(ctx, 500));
  }

  ctx.handleEvent("open-terminal", () => openTerminal(ctx));
  ctx.handleEvent("print-terminal", (data) => k8s_xterm.write(data));
  ctx.handleEvent("dispose-terminal", () => k8s_xterm.dispose());
}
