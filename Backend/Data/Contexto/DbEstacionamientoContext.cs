﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Data.Models;

namespace Data.Contexto;

public partial class DbEstacionamientoContext : DbContext
{
    public DbEstacionamientoContext()
    {
    }

    public DbEstacionamientoContext(DbContextOptions<DbEstacionamientoContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Garaje> Garaje { get; set; }

    public virtual DbSet<Garajefoto> Garajefoto { get; set; }

    public virtual DbSet<Localidad> Localidad { get; set; }

    public virtual DbSet<Marca> Marca { get; set; }

    public virtual DbSet<Metodopago> Metodopago { get; set; }

    public virtual DbSet<Modelo> Modelo { get; set; }

    public virtual DbSet<Pago> Pago { get; set; }

    public virtual DbSet<Provincia> Provincia { get; set; }

    public virtual DbSet<Reserva> Reserva { get; set; }
    public virtual DbSet<ReservaEstado> ReservaEstado { get; set; }

    public virtual DbSet<Usuario> Usuario { get; set; }

    public virtual DbSet<Vehiculo> Vehiculo { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Garaje>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("garaje_pkey");

            entity.ToTable("garaje");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Altura).HasColumnName("altura");
            entity.Property(e => e.Calle)
                .HasMaxLength(100)
                .HasColumnName("calle");
            entity.Property(e => e.Capacidad).HasColumnName("capacidad");
            entity.Property(e => e.Descripcion).HasColumnName("descripcion");
            entity.Property(e => e.Disponible)
                    .HasColumnName("disponible")
                    .HasDefaultValue(true);  
            entity.Property(e => e.Idlocalidad).HasColumnName("idlocalidad");
            entity.Property(e => e.Idpropietario).HasColumnName("idpropietario");
            entity.Property(e => e.Preciohora)
                .HasPrecision(10, 2)
                .HasColumnName("preciohora");

            entity.HasOne(d => d.IdlocalidadNavigation).WithMany(p => p.Garajes)
                .HasForeignKey(d => d.Idlocalidad)
                .HasConstraintName("garaje_idlocalidad_fkey");

            entity.HasOne(d => d.IdpropietarioNavigation).WithMany(p => p.Garajes)
                .HasForeignKey(d => d.Idpropietario)
                .HasConstraintName("garaje_idpropietario_fkey");
        });

        modelBuilder.Entity<Garajefoto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("garajefoto_pkey");

            entity.ToTable("garajefoto");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Foto).HasColumnName("foto");
            entity.Property(e => e.Idgaraje).HasColumnName("idgaraje");

            entity.HasOne(d => d.IdgarajeNavigation).WithMany(p => p.Garajefotos)
                .HasForeignKey(d => d.Idgaraje)
                .HasConstraintName("garajefoto_idgaraje_fkey");
        });

        modelBuilder.Entity<Localidad>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("localidad_pkey");

            entity.ToTable("localidad");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Codpostal)
                .HasMaxLength(10)
                .HasColumnName("codpostal");
            entity.Property(e => e.Idprovincia).HasColumnName("idprovincia");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");

            entity.HasOne(d => d.IdprovinciaNavigation).WithMany(p => p.Localidads)
                .HasForeignKey(d => d.Idprovincia)
                .HasConstraintName("localidad_idprovincia_fkey");
        });

        modelBuilder.Entity<Marca>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("marca_pkey");

            entity.ToTable("marca");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre).HasColumnName("nombre");
        });

        modelBuilder.Entity<Metodopago>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("metodopago_pkey");

            entity.ToTable("metodopago");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Modelo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("modelo_pkey");

            entity.ToTable("modelo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Idmarca).HasColumnName("idmarca");
            entity.Property(e => e.Nombre).HasColumnName("nombre");

            entity.HasOne(d => d.IdmarcaNavigation).WithMany(p => p.Modelos)
                .HasForeignKey(d => d.Idmarca)
                .HasConstraintName("modelo_idmarca_fkey");
        });

        modelBuilder.Entity<Pago>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("pago_pkey");

            entity.ToTable("pago");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fecha");
            entity.Property(e => e.Idmetodopago).HasColumnName("idmetodopago");
            entity.Property(e => e.Idreserva).HasColumnName("idreserva");
            entity.Property(e => e.Monto)
                .HasPrecision(10, 2)
                .HasColumnName("monto");

            entity.HasOne(d => d.IdmetodopagoNavigation).WithMany(p => p.Pagos)
                .HasForeignKey(d => d.Idmetodopago)
                .HasConstraintName("pago_idmetodopago_fkey");

            entity.HasOne(d => d.IdreservaNavigation).WithMany(p => p.Pagos)
                .HasForeignKey(d => d.Idreserva)
                .HasConstraintName("pago_idreserva_fkey");
        });

        modelBuilder.Entity<Provincia>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("provincia_pkey");

            entity.ToTable("provincia");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Reserva>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("reserva_pkey");

            entity.ToTable("reserva");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Fechafin)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fechafin");
            entity.Property(e => e.Fechainicio)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fechainicio");
            entity.Property(e => e.Idconductor).HasColumnName("idconductor");
            entity.Property(e => e.Idgaraje).HasColumnName("idgaraje");
            entity.Property(e => e.Idreservaestado).HasColumnName("idreservaestado");

            entity.HasOne(d => d.IdconductorNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.Idconductor)
                .HasConstraintName("reserva_idconductor_fkey");

            entity.HasOne(d => d.IdgarajeNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.Idgaraje)
                .HasConstraintName("reserva_idgaraje_fkey");

            entity.HasOne(d => d.IdreservaestadoNavigation).WithMany(p => p.Reservas)
                .HasForeignKey(d => d.Idreservaestado)
                .HasConstraintName("reserva_idreservaestado_fkey");
        });

        modelBuilder.Entity<ReservaEstado>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("reservaestado_pkey");

            entity.ToTable("reservaestado");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuario_pkey");

            entity.ToTable("usuario");

            entity.HasIndex(e => e.Mail, "usuario_mail_key").IsUnique();

            entity.HasIndex(e => e.Username, "usuario_username_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .HasColumnName("apellido");
            entity.Property(e => e.Contrasena)
                .HasMaxLength(255)
                .HasColumnName("contrasena");
            entity.Property(e => e.Esconductor).HasColumnName("esconductor");
            entity.Property(e => e.Espropietario).HasColumnName("espropietario");
            entity.Property(e => e.Mail)
                .HasMaxLength(255)
                .HasColumnName("mail");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        modelBuilder.Entity<Vehiculo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("vehiculo_pkey");

            entity.ToTable("vehiculo");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Idconductor).HasColumnName("idconductor");
            entity.Property(e => e.Idmodelo).HasColumnName("idmodelo");
            entity.Property(e => e.Matricula).HasColumnName("matricula");

            entity.HasOne(d => d.IdconductorNavigation).WithMany(p => p.Vehiculos)
                .HasForeignKey(d => d.Idconductor)
                .HasConstraintName("vehiculo_idconductor_fkey");

            entity.HasOne(d => d.IdmodeloNavigation).WithMany(p => p.Vehiculos)
                .HasForeignKey(d => d.Idmodelo)
                .HasConstraintName("vehiculo_idmodelo_fkey");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
