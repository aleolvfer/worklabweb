function patientQueryParser(patientArray) {
  const result = patientArray.reduce((acc, item) =>{
    const patient = acc.find(patient => patient.patient_id === item.patient_id);

    if (patient) {
      const service = patient.services.find(service => service.service_id === item.service_id);
      
      if (service) {
        service.exams.push({
          exam_code: item.exam_code,
          exam_description: item.exam_description,
          exam_price: item.exam_price
        });
        
      } else {
        patient.services.push({
          service_id: item.service_id,
          exams: [
            {
              exam_code: item.exam_code,
              exam_description: item.exam_description,
              exam_price: item.exam_price
            }
          ]
        })
      }

    } else if (item.service_id) {
      acc.push({
        patient_id: item.patient_id,
        patient_name: item.patient_name,
        patient_email: item.patient_email,
        patient_sex: item.patient_sex,
        phone: item.phone,
        services: [
          {
            service_id: item.service_id,
            exams: [
              {
                exam_code: item.exam_code,
                exam_description: item.exam_description,
                exam_price: item.exam_price
              }
            ]
          }
        ]
      });

    } else {
      acc.push({
        patient_id: item.patient_id,
        patient_name: item.patient_name,
        patient_email: item.patient_email,
        patient_sex: item.patient_sex,
        phone: item.phone
      });
    }

    return acc;
  }, []);

  return result;
}

module.exports = patientQueryParser;