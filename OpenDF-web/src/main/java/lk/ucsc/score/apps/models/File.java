/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package lk.ucsc.score.apps.models;

import java.io.Serializable;
import java.util.Date;
import java.util.Collection;
import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.NamedQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.NamedQuery;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.Transient;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.xml.bind.annotation.XmlRootElement;
import lk.ucsc.score.apps.models.Diskimage;
import javax.xml.bind.annotation.XmlTransient;
/**
 *
 * @author Acer
 */
@Entity
@Table(name = "file")
@XmlRootElement
@NamedQueries({
    @NamedQuery(name = "File.findAll", query = "SELECT f FROM File f"),
    @NamedQuery(name = "File.findByIdFile", query = "SELECT f FROM File f WHERE f.idFile = :idFile"),
    @NamedQuery(name = "File.findByName", query = "SELECT f FROM File f WHERE f.name = :name"),
    @NamedQuery(name = "File.findByType", query = "SELECT f FROM File f JOIN f.diskImageidDiskImage d WHERE f.name LIKE :type AND d.idDiskImage IN (SELECT b.idDiskImage FROM Project p JOIN p.diskimageCollection b  WHERE p.idProject=:idProject)"),
    @NamedQuery(name = "File.findTypes", query = "SELECT f.name  FROM File f WHERE f.name LIKE '%.%'"),
    @NamedQuery(name = "File.findByMIMEtype", query = "SELECT f FROM File f WHERE f.mIMEtype = :mIMEtype"),
    @NamedQuery(name = "File.findByCreatedDate", query = "SELECT f FROM File f WHERE f.createdDate = :createdDate"),
    @NamedQuery(name = "File.findByUpdatedDate", query = "SELECT f FROM File f WHERE f.updatedDate = :updatedDate"),
    @NamedQuery(name = "File.findByAccessDate", query = "SELECT f FROM File f WHERE f.accessDate = :accessDate"),
    @NamedQuery(name = "File.findByParentDirectory", query = "SELECT f FROM File f WHERE f.parentDirectory = :parentDirectory")
 })
 @NamedNativeQuery(
    name="File.findByParentDirectoryN",
    query="SELECT fl.* FROM file fl WHERE fl.parent_idFile = ? AND diskimage_idDiskImage IN( SELECT d.idDiskImage FROM diskimage d WHERE Project_idProject= ? )",
    resultClass=File.class
)
public class File implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Basic(optional = false)
    @Column(name = "idFile")
    private Integer idFile;
    @Size(max = 45)
    @Column(name = "name")
    private String name;
    // @Max(value=?)  @Min(value=?)//if you know range of your decimal fields consider using these annotations to enforce field validation
    @Column(name = "size")
    private Float size;
    @Size(max = 45)
    @Column(name = "MIMEtype")
    private String mIMEtype;
    @Column(name = "createdDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdDate;
    @Column(name = "UpdatedDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date updatedDate;
    @Column(name = "AccessDate")
    @Temporal(TemporalType.TIMESTAMP)
    private Date accessDate;
    @Basic(optional = false)
    @NotNull
    @Column(name = "parent_idFile")
    private int parentDirectory;
    @JoinColumn(name = "diskImage_idDiskImage", referencedColumnName = "idDiskImage")
    @ManyToOne(optional = false)
    private Diskimage diskImageidDiskImage;
    @Column(name = "isVirtual")
    private int isVirtual;
    @Column(name = "isDir")
    private int isDir;
    @Transient
    private Collection<File> childrenCollection;    
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "idFile")
    private Collection<Note> noteCollection;

    public File() {
    }

    public File(Integer idFile) {
        this.idFile = idFile;
    }

    public File(Integer idFile, int parentDirectory) {
        this.idFile = idFile;
        this.parentDirectory = parentDirectory;
    }

    public Integer getIdFile() {
        return idFile;
    }

    public void setIdFile(Integer idFile) {
        this.idFile = idFile;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Float getSize() {
        return size;
    }

    public void setSize(Float size) {
        this.size = size;
    }

    public String getMIMEtype() {
        return mIMEtype;
    }

    public void setMIMEtype(String mIMEtype) {
        this.mIMEtype = mIMEtype;
    }

    public Date getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    public Date getUpdatedDate() {
        return updatedDate;
    }

    public void setUpdatedDate(Date updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Date getAccessDate() {
        return accessDate;
    }

    public void setAccessDate(Date accessDate) {
        this.accessDate = accessDate;
    }

    public int getParentDirectory() {
        return parentDirectory;
    }

    public void setParentDirectory(int parentDirectory) {
        this.parentDirectory = parentDirectory;
    }
    
    @XmlTransient
    public Diskimage getDiskImageidDiskImage() {
        return diskImageidDiskImage;
    }

    public void setDiskImageidDiskImage(Diskimage diskImageidDiskImage) {
        this.diskImageidDiskImage = diskImageidDiskImage;
    }

    public int getIsDir() {
        return isDir;
    }

    public void setIsDir(int isDir) {
        this.isDir = isDir;
    }
    
    public Collection<File> getChildrenCollection() {
        return childrenCollection;
    }

    public void setChildrenCollection(Collection<File> childrenCollection) {
        this.childrenCollection = childrenCollection;
    }
    
    public int getIsVirtual() {
        return isVirtual;
    }

    public void setIsVirtual(int isVirtual) {
        this.isVirtual = isVirtual;
    }
    
    @Override
    public int hashCode() {
        int hash = 0;
        hash += (idFile != null ? idFile.hashCode() : 0);
        return hash;
    }

    @Override
    public boolean equals(Object object) {
        // TODO: Warning - this method won't work in the case the id fields are not set
        if (!(object instanceof File)) {
            return false;
        }
        File other = (File) object;
        if ((this.idFile == null && other.idFile != null) || (this.idFile != null && !this.idFile.equals(other.idFile))) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "lk.ucsc.score.apps.File[ idFile=" + idFile + " ]";
    }
    
}
