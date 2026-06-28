const katex = require('katex');

const mathString = String.raw`\begin{bmatrix} \textcolor{red}{A} & \textcolor{red}{B} \\ \textcolor{skyblue}{C} & \textcolor{skyblue}{D} \end{bmatrix}`;

try {
  const html = katex.renderToString(mathString);
  console.log("Success with String.raw!");
} catch (e) {
  console.error("Error with String.raw:", e);
}

const mathString3 = String.raw`\begin{bmatrix} \textcolor{red}{A} & \textcolor{red}{B} \\ \textcolor{skyblue}{C} & \textcolor{skyblue}{D} \end{bmatrix} \times \begin{bmatrix} \textcolor{green}{E} & \textcolor{orange}{F} \\ \textcolor{green}{G} & \textcolor{orange}{H} \end{bmatrix} = \begin{bmatrix} (\textcolor{red}{A} \times \textcolor{green}{E}) + (\textcolor{red}{B} \times \textcolor{green}{G}) & (\textcolor{red}{A} \times \textcolor{orange}{F}) + (\textcolor{red}{B} \times \textcolor{orange}{H}) \\ (\textcolor{skyblue}{C} \times \textcolor{green}{E}) + (\textcolor{skyblue}{D} \times \textcolor{green}{G}) & (\textcolor{skyblue}{C} \times \textcolor{orange}{F}) + (\textcolor{skyblue}{D} \times \textcolor{orange}{H}) \end{bmatrix}`;

try {
  const html3 = katex.renderToString(mathString3);
  console.log("Success with full mathString3!");
} catch (e) {
  console.error("Error with full mathString3:", e);
}
