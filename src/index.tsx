import { useLayoutEffect, useState } from "react";
import React from 'react'
declare global {
  interface Window {
    MathJax: { [key: string]: any };
  }
}

const Latex = ({ latexExpression }: { latexExpression: string | HTMLElement | number }) => {
  const [mathJax, setMathJax] = useState<Window["MathJax"] | null>(window.MathJax || null);

  useLayoutEffect(() => {
    const existingMathJaxScript = document.getElementById("MathJax-script");

    if (existingMathJaxScript) {
      // If MathJax script already exists, ensure MathJax is loaded and ready
      if (window.MathJax) {
        setMathJax(window.MathJax);
        window.MathJax.typeset();
      } else {
        existingMathJaxScript.onload = () => {
          setMathJax(window.MathJax);
          window.MathJax.typeset();
        };
      }
    } else {
      const loadMathJax = async () => {
        try {
          const script = document.createElement("script");
          script.id = "MathJax-script";
          script.src = "https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js";
          script.async = true;
          script.type = "text/javascript";
          document.head.appendChild(script);

          script.onload = () => {
            setMathJax(window.MathJax);
            window.MathJax.typeset();
          };
        } catch (error) {
          console.error("Error loading MathJax:", error);
        }
      };

      loadMathJax();
    }

    // Clean up effect
    return () => {
      if (existingMathJaxScript) {
        existingMathJaxScript.onload = null;
      }
    };
  }, [latexExpression]); // Add latexExpression as a dependency to trigger the effect on changes

  return (
    <div
      className="w-full font-normal"
      dangerouslySetInnerHTML={{ __html: latexExpression }}
    />
  );
};

export default Latex;
