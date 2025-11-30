export function evalCondition(condition, answersSoFar) {
  const { questionKey, operator, value } = condition;
  const answer = answersSoFar?.[questionKey];

  if (answer === undefined || answer === null) {
    return false;
  }

  switch (operator) {
    case "equals":
      return answer === value;
    case "notEquals":
      return answer !== value;
    case "contains":
      if (Array.isArray(answer)) return answer.includes(value);
      return String(answer).includes(String(value));
    default:
      return false;
  }
}

export function shouldShowQuestion(rules, answersSoFar = {}) {
  if (!rules) return true;

  const { logic = "AND", conditions = [] } = rules;

  const results = conditions.map((c) => {
    try {
      return evalCondition(c, answersSoFar);
    } catch (e) {
      return false;
    }
  });

  if (results.length === 0) return true;

  return logic === "AND"
    ? results.every(Boolean)
    : results.some(Boolean);
}
