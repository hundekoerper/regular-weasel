module.exports = function(values) {
  if(values.hasOwnProperty("opera")){
    values["opera"][9.5] = values["opera"]["9.5-9.6"];
    values["opera"][9.6] = values["opera"]["9.5-9.6"];
    values["opera"][10.0] = values["opera"]["10.0-10.1"];
    values["opera"][10.1] = values["opera"]["10.0-10.1"];
  };

  if(values.hasOwnProperty("ios_saf")){
    values["ios_saf"][4.0] = values["ios_saf"]["4.0-4.1"];
    values["ios_saf"][4.1] = values["ios_saf"]["4.0-4.1"];
    values["ios_saf"][5.0] = values["ios_saf"]["5.0-5.1"];
    values["ios_saf"][5.1] = values["ios_saf"]["5.0-5.1"];
    values["ios_saf"][6.0] = values["ios_saf"]["6.0-6.1"];
    values["ios_saf"][6.1] = values["ios_saf"]["6.0-6.1"];
    values["ios_saf"][7.0] = values["ios_saf"]["7.0-7.1"];
    values["ios_saf"][7.1] = values["ios_saf"]["7.0-7.1"];
    values["ios_saf"][8.1] = values["ios_saf"]["8.1-8.4"];
    values["ios_saf"][8.2] = values["ios_saf"]["8.1-8.4"];
    values["ios_saf"][8.3] = values["ios_saf"]["8.1-8.4"];
    values["ios_saf"][8.4] = values["ios_saf"]["8.1-8.4"];
  };

  if(values.hasOwnProperty("op_mini")){
    values["op_mini"][5] = values["op_mini"]["5.0-8.0"];
    values["op_mini"][6] = values["op_mini"]["5.0-8.0"];
    values["op_mini"][7] = values["op_mini"]["5.0-8.0"];
    values["op_mini"][8] = values["op_mini"]["5.0-8.0"];
  };

  if(values.hasOwnProperty("android")){
    values["android"][4.2] = values["android"]["4.2-4.3"];
    values["android"][4.3] = values["android"]["4.2-4.3"];
    values["android"][4.43] = values["android"]["4.4.3-4.4.4"];
    values["android"][4.44] = values["android"]["4.4.3-4.4.4"];
  };
}
