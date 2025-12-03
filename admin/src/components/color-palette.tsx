import { Flex, Typography } from '@strapi/design-system';
import React from 'react';
import styled from 'styled-components';

type ColorPaletteProps = {
  colors: string[]; // exactly four colors expected
  label?: string;
};

const size = 20;

const overlap = 14;

const Wrapper = styled.div<{ size: number; overlap: number }>`
  position: relative;
  height: ${({ size }) => size}px;
  width: ${({ size, overlap }) => size + overlap * 3}px;
`;

const Swatch = styled.div<{ size: number; left: number; color: string }>`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  left: ${({ left }) => left}px;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.neutral0}; /* ✔ uses neutral0 */
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.15);
  background-color: ${({ color }) => color};
`;

export const ColorPalette: React.FC<ColorPaletteProps> = ({ colors, label }) => {
  return (
    <Flex gap={2}>
      <Wrapper size={size} overlap={overlap}>
        {colors.map((color, i) => (
          <Swatch key={`${color}-${i}`} size={size} left={i * overlap} color={color} />
        ))}
      </Wrapper>
      {label && <Typography>{label}</Typography>}
    </Flex>
  );
};
