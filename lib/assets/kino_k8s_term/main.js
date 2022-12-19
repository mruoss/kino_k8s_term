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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vYXNzZXRzL2pzL21haW4uanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0veHRlcm1ANS4wLjAvbGliL3h0ZXJtLm1pbi5qc1wiO1xuXG5sZXQgazhzX3h0ZXJtO1xuXG5jb25zdCBvcGVuVGVybWluYWwgPSAoY3R4KSA9PiB7XG4gIGs4c194dGVybSA9IG5ldyBUZXJtaW5hbCgpO1xuICBrOHNfeHRlcm0ub25LZXkoKGtleSkgPT4ge1xuICAgIGNvbnNvbGUubG9nKGtleSk7XG4gICAgY3R4LnB1c2hFdmVudChcImtleVwiLCBrZXkua2V5KTtcbiAgfSk7XG4gIGs4c194dGVybS5vcGVuKGN0eC5yb290LnF1ZXJ5U2VsZWN0b3IoXCIuazhzLXh0ZXJtanMtY29udGFpbmVyXCIpKTtcbiAgazhzX3h0ZXJtLmZvY3VzKCk7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChjdHgsIGF0dHJzKSB7XG4gIGN0eC5pbXBvcnRDU1MoXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL3h0ZXJtQDUuMC4wL2Nzcy94dGVybS5jc3NcIik7XG5cbiAgY3R4LnJvb3QuaW5uZXJIVE1MID0gYFxuICAgIDxkaXYgaWQ9XCJrOHMtdGVybWluYWxcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJrOHMteHRlcm1qcy1jb250YWluZXJcIj48L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYDtcblxuICBpZiAoYXR0cnMudGVybV9waWQpIHtcbiAgICBjb25zb2xlLmxvZyhcIm9wZW5pbmcgdGVybWluYWxcIik7XG4gICAgc2V0VGltZW91dCgoKSA9PiBvcGVuVGVybWluYWwoY3R4LCA1MDApKTtcbiAgfVxuXG4gIGN0eC5oYW5kbGVFdmVudChcIm9wZW4tdGVybWluYWxcIiwgKCkgPT4gb3BlblRlcm1pbmFsKGN0eCkpO1xuICBjdHguaGFuZGxlRXZlbnQoXCJwcmludC10ZXJtaW5hbFwiLCAoZGF0YSkgPT4gazhzX3h0ZXJtLndyaXRlKGRhdGEpKTtcbiAgY3R4LmhhbmRsZUV2ZW50KFwiZGlzcG9zZS10ZXJtaW5hbFwiLCAoKSA9PiBrOHNfeHRlcm0uZGlzcG9zZSgpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICJBQUFBLE9BQU87QUFFUCxJQUFJO0FBRUosTUFBTSxlQUFlLENBQUMsUUFBUTtBQUM1QixjQUFZLElBQUksU0FBUztBQUN6QixZQUFVLE1BQU0sQ0FBQyxRQUFRO0FBQ3ZCLFlBQVEsSUFBSSxHQUFHO0FBQ2YsUUFBSSxVQUFVLE9BQU8sSUFBSSxHQUFHO0FBQUEsRUFDOUIsQ0FBQztBQUNELFlBQVUsS0FBSyxJQUFJLEtBQUssY0FBYyx3QkFBd0IsQ0FBQztBQUMvRCxZQUFVLE1BQU07QUFDbEI7QUFFTyxnQkFBUyxLQUFLLEtBQUssT0FBTztBQUMvQixNQUFJLFVBQVUsd0RBQXdEO0FBRXRFLE1BQUksS0FBSyxZQUFZO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNckIsTUFBSSxNQUFNLFVBQVU7QUFDbEIsWUFBUSxJQUFJLGtCQUFrQjtBQUM5QixlQUFXLE1BQU0sYUFBYSxLQUFLLEdBQUcsQ0FBQztBQUFBLEVBQ3pDO0FBRUEsTUFBSSxZQUFZLGlCQUFpQixNQUFNLGFBQWEsR0FBRyxDQUFDO0FBQ3hELE1BQUksWUFBWSxrQkFBa0IsQ0FBQyxTQUFTLFVBQVUsTUFBTSxJQUFJLENBQUM7QUFDakUsTUFBSSxZQUFZLG9CQUFvQixNQUFNLFVBQVUsUUFBUSxDQUFDO0FBQy9EOyIsCiAgIm5hbWVzIjogW10KfQo=
