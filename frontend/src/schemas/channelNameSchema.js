import * as yup from 'yup';

const getChannelNameSchema = (channelNames) => yup.object().shape({
  name: yup
    .string()
    .min(3, 'channelNameMin3')
    .max(20, 'nameMax20')
    .notOneOf(channelNames, 'channelNameAlreadyExist')
    .required('nameRequired'),
});

export default getChannelNameSchema;
