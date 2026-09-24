import { React } from "react";
import { View, Text, StyleSheet } from "react-native";
import { coloresPorNivel, colors, spacing } from "../theme";

export default function LabelLevel({ nivel }) {

  const fondo = coloresPorNivel[nivel] || colors.primarioSuave;

  return (
    <View style={[styles.container, { backgroundColor: fondo, borderColor: fondo }]}>
      <Text style={styles.text}>{nivel}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignSelf: "flex-start",
    paddingVertical: 3,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderRadius: 999,
  },
  text: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
