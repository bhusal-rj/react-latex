import { useLayoutEffect, useState } from "react";
import React from 'react'
declare global {
  interface Window {
    MathJax: { [key: string]: any };
  }
}

const Latex = ({ latexExpression }: { latexExpression: string | HTMLElement | number }) => {
  const [_, setMathJax] = useState<Window["MathJax"] | null>(
    window.MathJax || null
  );

  useLayoutEffect(() => {
    const existingMathJaxScript = document.getElementById("MathJax-script");

    if (existingMathJaxScript) {
      const onLoad = existingMathJaxScript.onload as () => void;
      console.log("Latex",_)
      window.MathJax?.typeset();

      existingMathJaxScript.onload = () => {
        onLoad();
        setMathJax(window.MathJax);
        window.MathJax?.typeset();
      };
    } else {
      const loadMathJax = async () => {
        try {
          // @ts-ignore
          await import("https://polyfill.io/v3/polyfill.min.js?features=es6");
          const script = document.createElement("script");
          script.id = "MathJax-script";
          script.src =
            "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
          script.async = true;
          script.type = "text/javascript";
          document.head.appendChild(script);

          script.onload = () => {
            setMathJax(window.MathJax);
            // Manually typeset after MathJax is loaded
            window.MathJax?.typeset();
          };
        } catch (error) {
          console.error("Error loading MathJax:", error);
        }
      };

      loadMathJax();
    }

    // Clean up effect
    return () => {};
  }, [latexExpression]); // Add latexExpression as a dependency to trigger the effect on changes

  return (
    <div
      className="w-full"
      dangerouslySetInnerHTML={{ __html: latexExpression }}
    />
  );
};

export default Latex;
