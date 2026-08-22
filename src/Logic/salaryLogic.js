function calculateSalaryBreakdown(monthlyWage, config) {
  const basic = monthlyWage * config.basicPct;
  const hra = basic * config.hraPctOfBasic;
  const standardAllowance = config.standardAllowance || 0;
  const performanceBonus = config.performanceBonusPct
    ? monthlyWage * config.performanceBonusPct
    : 0;
  const fixedAllowance = config.fixedAllowance || 0;

  const totalComponents =
    basic +
    hra +
    standardAllowance +
    performanceBonus +
    fixedAllowance;

  const pfEmployee = basic * config.pfEmployeePct;
  const pfEmployer = basic * config.pfEmployerPct;

  return {
    basic,
    hra,
    standardAllowance,
    performanceBonus,
    fixedAllowance,
    totalComponents,
    pfEmployee,
    pfEmployer,
    withinLimit: totalComponents <= monthlyWage,
  };
}

export { calculateSalaryBreakdown };