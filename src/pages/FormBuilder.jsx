import { useEffect, useState } from "react";
import axios from "axios";
import ConditionalRuleEditor from "../components/ConditionalRuleEditor";
import "./FormBuilder.css";

const FormBuilder = () => {
  const [bases, setBases] = useState([]);
  const [tables, setTables] = useState([]);
  const [fields, setFields] = useState([]);
  const [selectedBase, setSelectedBase] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [questions, setQuestions] = useState([]);
  const [formName, setFormName] = useState("");

  // 1. Fetch all Airtable bases
  useEffect(() => {
    axios.get("/api/airtable/bases").then((res) => {
      setBases(res.data.bases);
    });
  }, []);

  // 2. Fetch tables when base changes
  const fetchTables = async (baseId) => {
    setSelectedBase(baseId);
    const res = await axios.get(`/api/airtable/bases/${baseId}/tables`);
    setTables(res.data.tables);
  };

  // 3. Fetch fields when table changes
  const fetchFields = async (tableId) => {
    setSelectedTable(tableId);
    const res = await axios.get(
      `/api/airtable/bases/${selectedBase}/tables/${tableId}/fields`
    );
    setFields(res.data.fields);
  };

  // 4. Add a question
  const addQuestion = (field) => {
    setQuestions((prev) => [
      ...prev,
      {
        questionKey: field.id,
        airtableFieldId: field.id,
        label: field.name,
        type: field.type,
        required: false,
        conditionalRules: null, // <-- important
      },
    ]);
  };

  // 5. Update question (generic updater)
  const updateQuestion = (index, key, value) => {
    const updated = [...questions];
    updated[index][key] = value;
    setQuestions(updated);
  };

  // 6. Save form in DB
  const saveForm = async () => {
    await axios.post("/api/forms", {
      name: formName,
      baseId: selectedBase,
      tableId: selectedTable,
      questions,
    });

    alert("Form Saved Successfully!");
  };

  return (
    <div className="builder-container">
      <h2>Create Dynamic Form</h2>

      <input
        type="text"
        className="input"
        placeholder="Enter form name"
        value={formName}
        onChange={(e) => setFormName(e.target.value)}
      />

      {/* BASE SELECT */}
      <div>
        <label>Select Base</label>
        <select
          className="select"
          onChange={(e) => fetchTables(e.target.value)}
        >
          <option value="">Choose Base</option>
          {bases.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* TABLE SELECT */}
      {tables.length > 0 && (
        <div>
          <label>Select Table</label>
          <select
            className="select"
            onChange={(e) => fetchFields(e.target.value)}
          >
            <option value="">Choose Table</option>
            {tables.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* FIELD SELECT */}
      {fields.length > 0 && (
        <>
          <h3>Select Fields</h3>
          <div className="field-list">
            {fields.map((f) => (
              <div key={f.id} className="field-item">
                <span>{f.name}</span>
                <button
                  className="btn"
                  onClick={() => addQuestion(f)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* QUESTION LIST */}
      {questions.length > 0 && (
        <>
          <h3>Form Questions</h3>

          {questions.map((q, index) => (
            <div key={q.questionKey} className="question-card">
              <label>Label</label>
              <input
                className="input"
                value={q.label}
                onChange={(e) =>
                  updateQuestion(index, "label", e.target.value)
                }
              />

              <label>
                <input
                  type="checkbox"
                  checked={q.required}
                  onChange={(e) =>
                    updateQuestion(index, "required", e.target.checked)
                  }
                />
                Required
              </label>

              {/* ⭐⭐ INTEGRATED CONDITIONAL RULE EDITOR ⭐⭐ */}
              <ConditionalRuleEditor
                questions={questions}
                value={q.conditionalRules}
                onChange={(rules) =>
                  updateQuestion(index, "conditionalRules", rules)
                }
              />
            </div>
          ))}

          <button className="save-btn" onClick={saveForm}>
            Save Form
          </button>
        </>
      )}
    </div>
  );
};

export default FormBuilder;
