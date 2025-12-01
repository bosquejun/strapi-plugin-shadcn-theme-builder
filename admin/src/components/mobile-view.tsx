import styled from 'styled-components';

export const MobileView = styled.div`
  display: block; // visible by default
  width: 100%;
  @media (min-width: 1080px) {
    // desktop breakpoint
    display: none;
  }
`;
