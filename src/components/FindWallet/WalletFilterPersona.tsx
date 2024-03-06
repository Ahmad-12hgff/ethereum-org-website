import { MdCircle } from "react-icons/md"
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
} from "@chakra-ui/react"

import { WalletFilter } from "@/lib/types"

import { trackCustomEvent } from "@/lib/utils/matomo"
import { getPersonaBorderColor } from "@/lib/utils/wallets"

import { useWalletPersonas } from "../../hooks/useWalletPersonas"

type WalletFilterPersonaProps = {
  resetFilters: () => void
  setFilters: React.Dispatch<React.SetStateAction<WalletFilter>>
  selectedPersona: number
  setSelectedPersona: React.Dispatch<React.SetStateAction<number>>
  showMobileSidebar: boolean
}

const WalletFilterPersona = ({
  resetFilters,
  setFilters,
  selectedPersona,
  setSelectedPersona,
  showMobileSidebar,
}: WalletFilterPersonaProps) => {
  const personas = useWalletPersonas()

  return (
    <Grid
      gap={showMobileSidebar ? 2 : 4}
      autoColumns="minmax(0, 1fr)"
      templateColumns={showMobileSidebar ? "repeat(2, 1fr)" : "minmax(0, 1fr)"}
      mb={showMobileSidebar ? 4 : 2}
    >
      {personas.map((persona, idx) => {
        return (
          <GridItem key={persona.title} gridRow={{ base: "auto", lg: 1 }}>
            <Flex
              h="100%"
              direction="column"
              alignItems="flex-start"
              padding={2}
              border="solid"
              borderColor={getPersonaBorderColor(selectedPersona, idx)}
              bg="background.highlight"
              borderRadius="base"
              cursor="pointer"
              transition="0.5s all"
              _hover={{
                borderColor: "primary.hover",
              }}
              role="group"
              onClick={() => {
                if (idx === selectedPersona) {
                  resetFilters()
                  trackCustomEvent({
                    eventCategory: "UserPersona",
                    eventAction: `${persona.title}`,
                    eventName: `${persona.title} false`,
                  })
                } else {
                  setSelectedPersona(idx)
                  setFilters(persona.presetFilters)
                  trackCustomEvent({
                    eventCategory: "UserPersona",
                    eventAction: `${persona.title}`,
                    eventName: `${persona.title} true`,
                  })
                }
              }}
            >
              <Flex gap={2} mb={showMobileSidebar ? 0 : 1} px={1.5}>
                <Box role="radio" aria-label={`${persona.title} filter`}>
                  <Icon
                    as={MdCircle}
                    borderRadius="full"
                    boxSize={2.5}
                    my={0}
                    mx={1}
                    fill={
                      selectedPersona === idx
                        ? "primary.base"
                        : "rgba(0, 0, 0, 0)"
                    }
                    background={
                      selectedPersona === idx ? "primary.base" : "transparent"
                    }
                    outline="1.5px solid"
                    outlineColor="primary.base"
                    outlineOffset="3px"
                    fontSize={8}
                    _groupHover={{ outlineColor: "primary.hover" }}
                  />
                </Box>

                <Heading
                  as="h3"
                  ms={0}
                  fontSize={showMobileSidebar ? "md" : "xl"}
                  fontWeight={showMobileSidebar ? "normal" : "bold"}
                  py={0}
                  pe={1}
                  ps={0}
                  lineHeight="1.7rem"
                  color="primary.base"
                  _groupHover={{
                    color: "primary.hover",
                  }}
                >
                  {persona.title}
                </Heading>
              </Flex>

              <Text
                display={showMobileSidebar ? "none" : "block"}
                p="0.4rem"
                color={selectedPersona === idx ? "text" : "text200"}
                fontSize="sm"
                fontWeight="normal"
                transition="0.5s all"
                lineHeight={1.3}
              >
                {persona.description}
              </Text>
            </Flex>
          </GridItem>
        )
      })}
    </Grid>
  )
}

export default WalletFilterPersona