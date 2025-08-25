import styled from 'styled-components';
import { Spinner } from '@chakra-ui/react';

const LodingPage = () => {
  return (
    <SLayout>
      <Spinner size='md' />
    </SLayout>
  );
};

const SLayout = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;

  width: inherit;
  height: inherit;
`;

export default LodingPage;
