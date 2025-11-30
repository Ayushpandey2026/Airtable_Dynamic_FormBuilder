// src/components/ConditionalRuleEditor.jsx
import React, { useState } from "react";
import "./ConditionalRuleEditor.css";


export default function ConditionalRuleEditor({ questions = [], value = null, onChange }) {
  const [logic, setLogic] = useState(value?.logic || "AND");
  const [conditions, setConditions] = useState(value?.conditions || []);

  const addCondition = () => {
    setConditions(prev => [...prev, { questionKey: questions[0]?.questionKey || "", operator: "equals", value: "" }]);
  };

  const updateCondition = (idx, patch) => {
    const copy = [...conditions];
    copy[idx] = { ...copy[idx], ...patch };
    setConditions(copy);
  };

  const removeCondition = (idx) => {
    const copy = [...conditions];
    copy.splice(idx,1);
    setConditions(copy);
  };

  const save = () => {
    if (conditions.length === 0) {
      onChange(null);
      return;
    }
    onChange({ logic, conditions });
  };

  return (
    <div className="rule-editor card">
      <h4>Conditional Visibility</h4>
      <div className="row">
        <label>Logic</label>
        <select value={logic} onChange={e => setLogic(e.target.value)}>
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
      </div>

      <div className="conditions">
        {conditions.map((c, idx) => (
          <div className="cond" key={idx}>
            <select value={c.questionKey} onChange={e => updateCondition(idx, { questionKey: e.target.value })}>
              {questions.map(q => <option key={q.questionKey} value={q.questionKey}>{q.label}</option>)}
            </select>

            <select value={c.operator} onChange={e => updateCondition(idx, { operator: e.target.value })}>
              <option value="equals">equals</option>
              <option value="notEquals">not equals</option>
              <option value="contains">contains</option>
            </select>

            <input value={c.value} onChange={e => updateCondition(idx, { value: e.target.value })} placeholder="value" />

            <button className="danger" onClick={() => removeCondition(idx)}>Remove</button>
          </div>
        ))}
      </div>

      <div className="controls">
        <button onClick={addCondition}>+ Add condition</button>
        <button className="save" onClick={save}>Save rules</button>
      </div>
    </div>
  );
}
