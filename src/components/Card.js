import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import LabelLevel from "./LabelLevel";
import { colors, radius, spacing, typography } from "../theme";
import { formatearPrecio } from "../data/classes";

export default function Card({ clase, onPress, style }) {
  return (

      <Pressable onPress={onPress} style={[styles.card, styles.container, style]}>
        <Image source={{ uri: clase.imagen }} style={styles.imagen} />
        <View style={styles.contenido}>
          <LabelLevel nivel={clase.nivel}/>
          <Text style={styles.titulo}>{clase.titulo}</Text>
          <Text style={styles.profesor}>Profesor: {clase.profesor?.nombre}</Text>
          <Text style={styles.horario}>Horario: {clase.horarios?.join("\n")}</Text>
          <Text style={styles.precio}>Precio: {formatearPrecio(clase.precio)}</Text>
        </View>
      </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.superficie,
    borderRadius: radius.lg,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: colors.borde,
    marginBottom: spacing.md,
    marginTop: spacing.md,
    marginHorizontal: spacing.sm,
    shadowColor: "#0F172A",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  imagen: {
    width: "100%",
    height: 150,
  },
  contenido: {
    padding: spacing.md,
    gap: spacing.xs,
  },
  titulo: {
    ...typography.subtitulo,
    marginTop: spacing.xs,
  },
  profesor: {
    ...typography.cuerpo,
    fontWeight: "600",
    marginTop: spacing.sm,
  },
  horario: {
    ...typography.secundario,
    lineHeight: 18,
  },
  precio: {
    ...typography.cuerpo,
    fontWeight: "700",
    color: colors.primario,
  },
  avatarProfesor: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
});