function serviceQueryParser(serviceArray) {
  const result = serviceArray.reduce((acc, item) =>{
    const service = acc.find(service => service.service_id === item.service_id);

    if (service) {
      service.exams.push({
          exam_code: item.exam_code,
          exam_description: item.exam_description,
          exam_price: item.exam_price
      });

    } else {
      acc.push({
        service_id: item.service_id,
        patient_id: item.patient_id,
        patient_name: item.patient_name,
        patient_email: item.patient_email,
        patient_sex: item.patient_sex,
        patient_phone: item.phone,
        exams: [
          {
            exam_code: item.exam_code,
            exam_description: item.exam_description,
            exam_price: item.exam_price
          }
        ]
      });
    }

    return acc;
  }, []);

  return result;
}

module.exports = serviceQueryParser;
