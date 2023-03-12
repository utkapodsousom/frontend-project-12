import * as yup from 'yup';

const channelNameSchema = yup.object().shape({
  name: yup.string().min(3, 'channelNameMin3').max(20, 'nameMax20').required('nameRequired'),
});

export default channelNameSchema;
