import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Alert, Image, Pressable } from "react-native";

import { colors, spacing, radius, typography } from "../theme";
import { formatearPrecio } from "../data/classes";
import LabelLevel from "../components/LabelLevel";

export default function DetalleClasesScreen({ route }) {
  const { clase } = route.params;
  const [cuposDisponibles, setCuposDisponibles] = useState(clase.cupos ?? 0);

  const reservarClase = () => {
    if (cuposDisponibles <= 0) {
      Alert.alert("Sin cupos", "Esta clase ya no tiene cupos disponibles.");
      return;
    }

    const nuevosCupos = cuposDisponibles - 1;
    setCuposDisponibles(nuevosCupos);
    Alert.alert("Reserva realizada", "Has reservado correctamente.");
  };

   return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: clase.imagen }} style={styles.imagen} />

      <View style={styles.header}>
        <LabelLevel nivel={clase.nivel} />
        <Text style={styles.titulo}>{clase.titulo}</Text>
      </View>

      <Text style={styles.descripcion}>{clase.descripcion}</Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Profesor</Text>
        <View style={styles.profesorRow}>
          <Text style={styles.value}>{clase.profesor?.nombre}</Text>
          <Image source={{ uri: clase.profesor?.foto }} style={styles.avatarProfesor} />
        </View>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Precio</Text>
        <Text style={styles.value}>{formatearPrecio(clase.precio)}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>Horarios</Text>
        {clase.horarios?.map((horario) => (
          <Text key={horario} style={styles.value}>• {horario}</Text>
        ))}
      </View>
      <View style={styles.reservaContainer}>
        <Text style={styles.cuposTexto}>Cupos: {cuposDisponibles}</Text>
        <Pressable
          onPress={reservarClase}
          disabled={cuposDisponibles <= 0}
          style={[styles.botonReserva, cuposDisponibles <= 0 && styles.botonReservaDeshabilitado]}
        >
          <Text style={styles.botonReservaTexto}>Reservar</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.fondo,
  },
  content: {
    padding: spacing.lg,
  },
  imagen: {
    width: "100%",
    height: 220,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },
  header: {
    marginBottom: spacing.md,
  },
  titulo: {
    ...typography.titulo,
    marginTop: spacing.sm,
  },
  descripcion: {
    ...typography.cuerpo,
    lineHeight: 22,
    color: colors.textoSuave,
    marginBottom: spacing.lg,
  },
  reservaContainer: {
    marginTop: spacing.sm,
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  cuposTexto: {
    ...typography.secundario,
    textAlign: "center",
  },
  botonReserva: {
    backgroundColor: colors.primario,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  botonReservaDeshabilitado: {
    backgroundColor: colors.textoSuave,
  },
  botonReservaTexto: {
    ...typography.cuerpo,
    color: colors.superficie,
    fontWeight: "700",
  },
  infoBox: {
    backgroundColor: colors.superficie,
    borderRadius: radius.md,
    padding: spacing.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.borde,
  },
  label: {
    ...typography.secundario,
    marginBottom: spacing.xs,
    textTransform: "uppercase",
  },
  value: {
    ...typography.cuerpo,
    marginBottom: spacing.xs,
  },
  profesorRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textoVacio: {
    ...typography.subtitulo,
  },

  avatarProfesor: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});