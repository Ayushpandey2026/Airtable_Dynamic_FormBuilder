// src/pages/FormViewer.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FieldRenderer from "../components/FieldRenderer";
import { shouldShowQuestion } from "../utils/conditional";
import api from "../services/api";
import "./FormViewer.css";

export default function FormViewer(){
  const { formId } = useParams();
  const [form, setForm] = useState(null);
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    api.get(`/forms/${formId}`).then(res => setForm(res.data)).catch(console.error);
  }, [formId]);

  if (!form) return <div>Loading...</div>;

  const visibleQuestions = form.questions.filter(q => shouldShowQuestion(q.conditionalRules || null, answers));

  const handleChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    const errs = {};
    visibleQuestions.forEach(q => {
      if (q.required) {
        const val = answers[q.questionKey];
        if (val === undefined || val === null || (typeof val === "string" && !val.trim()) || (Array.isArray(val) && val.length === 0)) {
          errs[q.questionKey] = "Required";
        }
      }
      // additional validations (single-select option exists etc.)
    });
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = async () => {
    if (!validate()) return;
    // map answers to airtable fields
    const payload = {
      formId,
      answers
    };
    await api.post(`/forms/${formId}/submit`, payload);
    alert("Submitted!");
  };

  return (
    <div className="form-viewer">
      <h2>{form.title || "Form"}</h2>
      <div className="questions">
        {visibleQuestions.map(q => (
          <div key={q.questionKey} className="question-wrap">
            <FieldRenderer
              question={q}
              value={answers[q.questionKey]}
              onChange={val => handleChange(q.questionKey, val)}
            />
            {errors[q.questionKey] && <div className="error">{errors[q.questionKey]}</div>}
          </div>
        ))}
      </div>

      <button className="submit" onClick={onSubmit}>Submit</button>
    </div>
  );
}
