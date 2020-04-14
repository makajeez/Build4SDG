const impactInfectionsByRequestedTime = (periodType, timeToElapse) => {
  if (periodType === 'days') {
    return (2 ** Math.trunc(timeToElapse / 3));
  }
  if (periodType === 'weeks') {
    return (2 ** Math.trunc((timeToElapse * 7) / 3));
  }
  if (periodType === 'months') {
    return (2 ** Math.trunc((timeToElapse * 30) / 3));
  }
  return 0;
};

const handleDollarsInFlight = (periodType, timeToElapse, data) => {
  if (periodType === 'days') {
    return Math.trunc(data / timeToElapse);
  }
  if (periodType === 'weeks') {
    return Math.floor(data / (timeToElapse * 7));
  }
  if (periodType === 'months') {
    return Math.trunc(data / (timeToElapse * 30));
  }
  return 0;
};

const covid19ImpactEstimator = (data) => {
  const requestTime = impactInfectionsByRequestedTime(data.periodType, data.timeToElapse);
  const dollarsIncome = data.region.avgDailyIncomePopulation * data.region.avgDailyIncomeInUSD;
  const totalBed = data.totalHospitalBeds * 0.35;

  const impact = {
    currentlyInfected: data.reportedCases * 10
  };

  impact.infectionsByRequestedTime = impact.currentlyInfected * requestTime;
  impact.severeCasesByRequestedTime = Math.trunc(impact.infectionsByRequestedTime * 0.15);
  impact.hospitalBedsByRequestedTime = Math.trunc(totalBed - impact.severeCasesByRequestedTime);
  impact.casesForICUByRequestedTime = impact.infectionsByRequestedTime * 0.05;

  const infectionImpactTime = Math.trunc(
    impact.infectionsByRequestedTime * 0.02
  );

  impact.casesForVentilatorsByRequestedTime = infectionImpactTime;

  const dollarsFlight = (impact.infectionsByRequestedTime * dollarsIncome);
  impact.dollarsInFlight = handleDollarsInFlight(data.periodType, data.timeToElapse, dollarsFlight);

  const severeImpact = {
    currentlyInfected: data.reportedCases * 50
  };

  severeImpact.infectionsByRequestedTime = severeImpact.currentlyInfected * requestTime;

  const severeCaseTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.15);

  severeImpact.severeCasesByRequestedTime = severeCaseTime;

  const bedsTime = Math.trunc(totalBed - severeImpact.severeCasesByRequestedTime);

  severeImpact.hospitalBedsByRequestedTime = bedsTime;

  const icuTime = Math.trunc(severeImpact.infectionsByRequestedTime * 0.05);

  severeImpact.casesForICUByRequestedTime = icuTime;

  const infectionImpact = Math.trunc(
    severeImpact.infectionsByRequestedTime * 0.02
  );

  severeImpact.casesForVentilatorsByRequestedTime = infectionImpact;

  const dFlight = (severeImpact.infectionsByRequestedTime * dollarsIncome);

  severeImpact.dollarsInFlight = handleDollarsInFlight(data.periodType, data.timeToElapse, dFlight);

  return { data, impact, severeImpact };
};

export default covid19ImpactEstimator;
