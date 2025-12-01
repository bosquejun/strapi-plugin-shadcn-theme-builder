import styled from 'styled-components';

export const DesktopView = styled.div`
  display: none;
  width: 100%;
  @media (min-width: 1080px) {
    // desktop breakpoint
    display: block;
  }
`;
